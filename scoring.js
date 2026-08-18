// scoring.js
// Captures keystrokes during a running test and judges each one correct or
// incorrect against the stimulus generator. No correction is allowed
// (Backspace/Delete are swallowed) - this is a fluency "sprint," not an
// editable typing test.

function createScorer(stimulusGen) {
  let position = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  const errorCounts = new Map(); // expected char -> incorrect count

  function recordError(expectedChar) {
    errorCounts.set(expectedChar, (errorCounts.get(expectedChar) || 0) + 1);
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
    }
  };
}
