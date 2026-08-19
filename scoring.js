// scoring.js
// Captures keystrokes during a running test and judges each one correct or
// incorrect against the stimulus generator. No correction is allowed
// (Backspace/Delete are swallowed) - this is a fluency "sprint," not an
// editable typing test.

// A char needs at least this many timed occurrences before it's eligible
// for the "slowest keys" breakdown - a single slow keystroke could just be
// a one-off attention lapse, not a real hesitation pattern.
const MIN_SLOW_KEY_OCCURRENCES = 2;
// "Flag as slow" threshold: sessionMedian + SLOW_KEY_THRESHOLD_K robust
// standard deviations (see MAD_CONSISTENCY_CONSTANT).
const SLOW_KEY_THRESHOLD_K = 2;
// Scales median absolute deviation to be roughly stdev-equivalent under a
// normal distribution (1 / Phi^-1(3/4)) - the standard robust-stats
// "consistency constant" for MAD.
const MAD_CONSISTENCY_CONSTANT = 1.4826;

// Precondition: values is a non-empty array of numbers.
function median(values) {
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

// Precondition: values is a non-empty array of numbers.
function medianAbsoluteDeviation(values, aroundMedian) {
  return median(values.map((v) => Math.abs(v - aroundMedian)));
}

function createScorer(stimulusGen) {
  let position = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  const errorCounts = new Map(); // expected char -> incorrect count
  const charLatencies = new Map(); // expected char -> inter-keystroke interval ms[]
  let lastKeystrokeTime = null; // performance.now() of the previous scored keystroke

  function recordError(expectedChar) {
    errorCounts.set(expectedChar, (errorCounts.get(expectedChar) || 0) + 1);
  }

  function recordLatency(expectedChar, intervalMs) {
    if (!charLatencies.has(expectedChar)) charLatencies.set(expectedChar, []);
    charLatencies.get(expectedChar).push(intervalMs);
  }

  return {
    get position() {
      return position;
    },
    get correctCount() {
      return correctCount;
    },
    get incorrectCount() {
      return incorrectCount;
    },
    // Returns { correct, expected } for a scored keystroke, or null if the
    // key wasn't a scorable character (Shift, Tab, CapsLock, Enter, arrows,
    // Backspace/Delete, etc. are all ignored for scoring purposes).
    handleKeydown(event) {
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        return null;
      }
      if (event.key.length !== 1) {
        return null;
      }

      event.preventDefault();
      stimulusGen.ensureAhead(position);
      const expected = stimulusGen.charAt(position);
      const correct = event.key === expected;

      // Hesitation before a keystroke happens regardless of whether the
      // keystroke itself ends up right or wrong, so latency is recorded for
      // both. Backspace/Delete/modifier keys are already filtered out above,
      // so this doesn't pick up correction-related noise. The first
      // keystroke of a run has no previous timestamp to diff against, so
      // it's skipped rather than recorded as a bogus 0 or huge value.
      const now = performance.now();
      if (lastKeystrokeTime !== null) {
        recordLatency(expected, now - lastKeystrokeTime);
      }
      lastKeystrokeTime = now;

      if (correct) {
        correctCount++;
      } else {
        incorrectCount++;
        recordError(expected);
      }
      position++;

      return { correct, expected };
    },
    // Top N expected characters that produced the most incorrect keystrokes,
    // as [char, count] pairs sorted descending by count.
    errorBreakdown(topN = 5) {
      const entries = Array.from(errorCounts.entries());
      entries.sort((a, b) => b[1] - a[1]);
      return entries.slice(0, topN);
    },
    // Top N expected characters whose typical (median) hesitation time was
    // notably higher than the session's overall typical hesitation time, as
    // [char, medianLatencyMs] pairs sorted descending by latency. A char
    // needs >= MIN_SLOW_KEY_OCCURRENCES timed occurrences to be eligible so
    // a single slow keystroke can't look like a pattern. Uses median + MAD
    // (median absolute deviation) rather than mean + stdev because typing
    // intervals are right-skewed - occasional large outliers (e.g. a
    // distraction) would otherwise inflate a stdev-based threshold and mask
    // real hesitation.
    slowKeyBreakdown(topN = 5) {
      const allIntervals = [];
      charLatencies.forEach((intervals) => allIntervals.push(...intervals));
      if (allIntervals.length === 0) return [];

      const sessionMedian = median(allIntervals);
      const sessionMad = medianAbsoluteDeviation(allIntervals, sessionMedian);
      const threshold =
        sessionMedian + SLOW_KEY_THRESHOLD_K * MAD_CONSISTENCY_CONSTANT * sessionMad;

      const candidates = [];
      charLatencies.forEach((intervals, char) => {
        if (intervals.length < MIN_SLOW_KEY_OCCURRENCES) return;
        const charMedian = median(intervals);
        if (charMedian > threshold) candidates.push([char, charMedian]);
      });

      candidates.sort((a, b) => b[1] - a[1]);
      return candidates.slice(0, topN);
    }
  };
}
