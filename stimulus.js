// stimulus.js
// Turns a test definition into a stream of characters to type against,
// generating more on demand (via ensureAhead) so a fast typist can never
// run out of material before time expires.

const STIMULUS_CHARS_PER_SECOND = 12; // generous ceiling, well above 120 WPM
const STIMULUS_MAX_LENGTH = 20000; // defensive cap, should never be hit in practice
const STIMULUS_LOOKAHEAD = 50; // top off once the cursor gets this close to the end

function createStimulusGenerator(test, durationSeconds) {
  let buffer = "";

  function batchLength() {
    return Math.min(
      Math.ceil(durationSeconds * STIMULUS_CHARS_PER_SECOND),
      STIMULUS_MAX_LENGTH
    );
  }

  function appendText(unit) {
    buffer += (buffer.length === 0 ? "" : " ") + unit.trim();
  }

  function appendWordbank(words) {
    const word = words[(Math.random() * words.length) | 0];
    buffer += (buffer.length === 0 ? "" : " ") + word;
  }

  function grow(targetLength) {
    if (!test.content || (Array.isArray(test.content) && test.content.length === 0)) {
      console.warn(`Test "${test.id}" has empty content; cannot generate stimulus.`);
      return;
    }
    while (buffer.length < targetLength && buffer.length < STIMULUS_MAX_LENGTH) {
      if (test.type === "text") {
        appendText(test.content);
      } else if (test.type === "wordbank") {
        appendWordbank(test.content);
      } else {
        console.warn(`Unknown test type "${test.type}" for test "${test.id}"`);
        return;
      }
    }
  }

  // seed with generous initial headroom
  grow(batchLength() * 1.5);

  return {
    get length() {
      return buffer.length;
    },
    charAt(index) {
      return buffer[index];
    },
    substring(start, end) {
      return buffer.substring(start, end);
    },
    // call on every keystroke - tops off the buffer once the cursor is
    // getting close to the end
    ensureAhead(position) {
      if (buffer.length - position < STIMULUS_LOOKAHEAD) {
        grow(buffer.length + batchLength());
      }
    }
  };
}
