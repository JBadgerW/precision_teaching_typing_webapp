// tests.js
// -----------------------------------------------------------------------
// Each entry below is one "pinpoint" - a specific typing behavior to time.
// To add a new one, copy an example object, give it a new unique id, and
// edit the rest. You don't need to touch any other file.
//
// Fields:
//   id               unique string, no spaces. Never reused.
//   name             shown to the student in the test picker.
//   type             "text" or "wordbank" (see below).
//   content          for type "text": a short string that gets repeated,
//                     separated by spaces, to fill the timing.
//                     for type "wordbank": a list of words the app will
//                     randomly sample (with repeats allowed) and join with
//                     spaces.
//   durations        which timings (in seconds) to offer for this pinpoint.
//   defaultDuration  which of `durations` is pre-selected. Must appear in
//                     the durations list.
//   instructions     optional short line shown to the student before they
//                     start.
//   source           optional. Instead of writing `content` inline, point
//                     this at a plain .txt file in this folder and leave
//                     `content` out entirely - it's filled in automatically
//                     the first time that test is picked. For type
//                     "wordbank", each non-blank line in the file becomes
//                     one bank entry (a file of whole sentences works the
//                     same way as a file of single words - one per line).
//                     For type "text", the whole file becomes the content
//                     to repeat. Good for large sentence lists or literature
//                     passages that are awkward to paste inline as a
//                     quoted JS string.
//
// -----------------------------------------------------------------------
// The 18-stage curriculum below follows the standard finger-by-finger key
// order (home row -> top row -> bottom row -> shift/punctuation/sentences),
// with a "words" pinpoint added to every stage from stage 4 onward, built
// only from letters introduced up through that stage. See the "Keys to
// Words" reference doc for the full rationale behind the ordering.
// -----------------------------------------------------------------------

const TESTS = [

  // ---- Stage 1: F & J (index-finger anchors) ----
  {
    id: "s01-fj-drill",
    name: "Stage 1: F and J",
    type: "text",
    content: "f j",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 10,
    instructions: "Type f and j, alternating. Fingers rest here between every other reach."
  },

  // ---- Stage 2: D & K (middle fingers) ----
  {
    id: "s02-dk-drill",
    name: "Stage 2: D and K",
    type: "text",
    content: "d k f j",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 10,
    instructions: "Type d and k, then review f and j."
  },

  // ---- Stage 3: S & L (ring fingers) ----
  {
    id: "s03-sl-drill",
    name: "Stage 3: S and L",
    type: "text",
    content: "s l d k",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 10,
    instructions: "Type s and l, then review d and k."
  },

  // ---- Stage 4: A & ; (pinky fingers) - first real words ----
  {
    id: "s04-a-semicolon-drill",
    name: "Stage 4: A and ;",
    type: "text",
    content: "a ; s l",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type a and semicolon, then review s and l."
  },
  {
    id: "s04-a-semicolon-words",
    name: "Stage 4 words: A and ;",
    type: "wordbank",
    content: ["as", "ask", "add", "sad", "fad", "lad", "fall", "lass", "flask", "salad", "alas"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 5: G & H (index reach to the middle) - home row complete ----
  {
    id: "s05-gh-drill",
    name: "Stage 5: G and H",
    type: "text",
    content: "g h a ;",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type g and h, then review a and semicolon. Home row is now complete."
  },
  {
    id: "s05-gh-words",
    name: "Stage 5 words: G and H",
    type: "wordbank",
    content: ["gas", "has", "flag", "flash", "glass", "half", "hall", "shall", "dash", "gala", "salsa"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 6: E & I (top row begins - highest-payoff vowels) ----
  {
    id: "s06-ei-drill",
    name: "Stage 6: E and I",
    type: "text",
    content: "e i",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type e and i, reaching up from the home row."
  },
  {
    id: "s06-ei-words",
    name: "Stage 6 words: E and I",
    type: "wordbank",
    content: ["is", "his", "she", "seal", "leaf", "safe", "sale", "fake", "fish", "field"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 7: R & U (index fingers, reach up) ----
  {
    id: "s07-ru-drill",
    name: "Stage 7: R and U",
    type: "text",
    content: "r u",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type r and u, reaching up from f and j."
  },
  {
    id: "s07-ru-words",
    name: "Stage 7 words: R and U",
    type: "wordbank",
    content: ["dark", "hair", "fear", "heard", "rush", "guard", "girl", "grade", "share", "grief"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 8: T & Y (index fingers, inward stretch) ----
  {
    id: "s08-ty-drill",
    name: "Stage 8: T and Y",
    type: "text",
    content: "t y",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type t and y."
  },
  {
    id: "s08-ty-words",
    name: "Stage 8 words: T and Y",
    type: "wordbank",
    content: ["the", "that", "this", "they", "great", "right", "light", "fight", "study", "tasty"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 9: W & O (ring fingers, reach up) ----
  {
    id: "s09-wo-drill",
    name: "Stage 9: W and O",
    type: "text",
    content: "w o",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type w and o."
  },
  {
    id: "s09-wo-words",
    name: "Stage 9 words: W and O",
    type: "wordbank",
    content: ["who", "how", "show", "slow", "grow", "throw", "world", "work", "worth", "story"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 10: Q & P (pinky fingers) - top row complete ----
  {
    id: "s10-qp-drill",
    name: "Stage 10: Q and P",
    type: "text",
    content: "q p",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type q and p. Top row is now complete."
  },
  {
    id: "s10-qp-words",
    name: "Stage 10 words: Q and P",
    type: "wordbank",
    content: ["up", "top", "stop", "play", "sport", "paper", "quiet", "square", "equal", "quote"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 11: V & M (index fingers, reach down) - bottom row begins ----
  {
    id: "s11-vm-drill",
    name: "Stage 11: V and M",
    type: "text",
    content: "v m",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type v and m, reaching down from f and j."
  },
  {
    id: "s11-vm-words",
    name: "Stage 11 words: V and M",
    type: "wordbank",
    content: ["am", "may", "day", "team", "dream", "move", "love", "give", "have", "very"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 12: C & , (middle fingers, reach down) ----
  {
    id: "s12-c-comma-drill",
    name: "Stage 12: C and ,",
    type: "text",
    content: "c ,",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type c and comma."
  },
  {
    id: "s12-c-comma-words",
    name: "Stage 12 words: C and ,",
    type: "wordbank",
    content: ["cat", "cup", "cast", "act", "race", "space", "place", "voice", "peace", "clear"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 13: X & . (ring fingers, reach down) ----
  {
    id: "s13-x-period-drill",
    name: "Stage 13: X and .",
    type: "text",
    content: "x .",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type x and period."
  },
  {
    id: "s13-x-period-words",
    name: "Stage 13 words: X and .",
    type: "wordbank",
    content: ["six", "fix", "mix", "flex", "exit", "extra", "text", "exact"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 14: Z & / (pinky fingers, reach down) ----
  {
    id: "s14-z-slash-drill",
    name: "Stage 14: Z and /",
    type: "text",
    content: "z /",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type z and slash."
  },
  {
    id: "s14-z-slash-words",
    name: "Stage 14 words: Z and /",
    type: "wordbank",
    content: ["zoo", "size", "prize", "quiz", "amaze", "crazy", "lazy", "gaze"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 15: N & B (index fingers) - all 26 letters complete ----
  {
    id: "s15-nb-drill",
    name: "Stage 15: N and B",
    type: "text",
    content: "n b",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type n and b. All 26 letters are now covered."
  },
  {
    id: "s15-nb-words",
    name: "Stage 15 words: N and B",
    type: "wordbank",
    content: ["and", "know", "been", "number", "bring", "brown", "night", "begin", "banana", "wonderful"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear."
  },

  // ---- Stage 16: Shift & capitals ----
  {
    id: "s16-shift-drill",
    name: "Stage 16: Shift and capitals",
    type: "text",
    content: "Ff Jj Dd Kk Ss Ll Aa",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Alternate capital and lowercase. Use the shift key on the opposite hand from the letter."
  },
  {
    id: "s16-shift-words",
    name: "Stage 16 words: capitalized names",
    type: "wordbank",
    content: ["Ben", "Grace", "Jack", "Faith", "Kevin", "Sara", "Max", "Wendy"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type each name with a capital first letter."
  },

  // ---- Stage 17: Apostrophes & sentence punctuation ----
  {
    id: "s17-punctuation-drill",
    name: "Stage 17: Punctuation",
    type: "text",
    content: "Really? Okay. Wait!",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type the phrase, including capitals and punctuation."
  },
  {
    id: "s17-punctuation-words",
    name: "Stage 17 words: contractions",
    type: "wordbank",
    content: ["can't", "don't", "won't", "isn't", "it's", "didn't", "wasn't", "couldn't"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type each contraction, including the apostrophe."
  },

  // ---- Stage 18: Full sentences (composition / generalization probes) ----
  {
    id: "s18-sentence-fox",
    name: "Stage 18: Sentence - quick brown fox",
    type: "text",
    content: "The quick brown fox jumps over the lazy dog.",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the sentence, including capitals and punctuation."
  },
  {
    id: "s18-sentence-seashells",
    name: "Stage 18: Sentence - seashells",
    type: "text",
    content: "She sells seashells by the seashore.",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the sentence, including capitals and punctuation."
  },
  {
    id: "s18-sentence-stars",
    name: "Stage 18: Sentence - night sky",
    type: "text",
    content: "Bright stars filled the quiet night sky.",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the sentence, including capitals and punctuation."
  },

  // ---- Extra: beyond the 18-stage curriculum ----
  // These stay last in the list on purpose - they're for students who have
  // finished all 18 stages above.
  {
    id: "extra-sentences-common-words",
    name: "Extra: Sentences (common words)",
    type: "wordbank",
    source: "sentences_top_english_words.txt",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 60,
    instructions: "Type each sentence as it appears, including capitals and punctuation."
  },
  {
    id: "extra-passage-alice-in-wonderland",
    name: "Extra: Passage - Alice in Wonderland",
    type: "text",
    source: "passage_alice_in_wonderland.txt",
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Type the passage. If you reach the end before time is up, it repeats from the start."
  }
];
