// tests.js  (revision 2 of the pinpoint set; the original is tests_old.js)
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
//   aim              optional. { correctPerMin: <number>, maxIncorrectPerMin:
//                     <number> }. Shown to the student on the results screen
//                     next to their own rate, e.g. "60+ correct/min, <=2
//                     err/min". A reference point, not a pass/fail gate - no
//                     color coding is applied (see todo.md re: colorblind-
//                     safe red/green).
//   aimTiming        optional. The certification timing in seconds: the aim
//                     only counts as met at this timing or longer. Shown on
//                     the results screen after the aim ("at 30s"). Shorter
//                     timings are practice sprints - they can't certify,
//                     both because endurance is part of fluency and because
//                     the record floor makes the <=2 err/min criterion
//                     unmeasurable below 30s (one error in 10s is 6/min).
//                     30 for stage drills and word banks, 60 for the
//                     checkpoints, benchmark, and extras.
//   assessment       optional boolean. When true, this pinpoint is a probe
//                     (the benchmark or a checkpoint): live error feedback
//                     is forced on for the run regardless of the student's
//                     "Show typing errors" setting, so every administration
//                     of the probe is measured under the same condition,
//                     matching real typing (errors are visible, not silent).
//
// -----------------------------------------------------------------------
// How this revision differs from the original tests.js:
//
//  1. RANDOMIZED DRILLS. Letter drills are now `wordbank` pinpoints made of
//     short random units ("f", "jf", "ff", ...) instead of a fixed repeating
//     string. A fixed string like "f j f j f j" quickly becomes a memorized
//     motor rhythm - the student stops reading the stimulus, and the timing
//     no longer measures the pinpointed behavior (sees letter -> strikes
//     key). Random sampling keeps the stimulus unpredictable.
//
//  2. FREQUENCY-REORDERED KEYS. The finger-pair progression is the standard
//     one (home row first, index fingers outward to pinkies), but N and B
//     are introduced right after the main top-row vowels/consonants, and the
//     rare letters Q, P, X, Z are pushed to the end. N is the 6th most
//     frequent letter in English; introducing it early unlocks the most
//     common words in the language (and, in, on, not, one, then, when,
//     than, but) many stages sooner, which serves the goal of typing real
//     words as early as possible.
//
//  3. CHECKPOINT REVIEW PROBES. At three milestones (home row complete,
//     20 keys complete, all 26 letters complete) there are cumulative
//     probes: a random-letter probe over every key learned so far, and a
//     mixed bank of the highest-frequency words from all prior stages.
//     These are retention/generalization "slices" - use them periodically
//     to check that earlier material is still fluent, not just the stage
//     currently being practiced.
//
//  4. FREQUENCY-FIRST WORD BANKS. Every word bank was re-picked to favor
//     the most common English words spellable with the letters taught so
//     far (all, had, said, like, with, would, ...), rather than rarer
//     filler words. Every word uses only letters introduced up through its
//     stage.
//
// FLUENCY AIMS. Every pinpoint below carries an `aim` field, shown to the
// student on the results screen next to their own rate. These are starting
// hypotheses, not established PT standards - tune them from your own
// students' celeration charts once you have data. The tiers used here:
//   Stage 1-5 drills (earliest acquisition): 40 correct/min, <=2 err/min.
//   Stage 6-15 drills:                       60 correct/min, <=2 err/min.
//   Word banks & checkpoint probes:          70 correct/min, <=2 err/min.
//   Shift/punctuation/sentences/extras:      90 correct/min, <=2 err/min.
//   Number/symbol drills (post-graduation):  60 correct/min, <=2 err/min.
//   Number/symbol banks & checkpoint:        70 correct/min, <=2 err/min.
//   Benchmark probe:                        150 correct/min, <=2 err/min.
// Every aim is qualified by an `aimTiming` (see the field reference above):
// 30s for stage drills and word banks, 60s for probes and extras. Shorter
// timings are practice sprints, not certification.
// The eight probe pinpoints (the benchmark, the three letter checkpoints,
// and the numbers checkpoint) also carry `assessment: true` - see the
// field reference above.
// -----------------------------------------------------------------------

const TESTS = [

  // ---- Stage 1: F & J (index-finger anchors) ----
  {
    id: "v2-s01-fj-drill",
    name: "Stage 1: F and J",
    type: "wordbank",
    content: ["f", "j", "ff", "jj", "fj", "jf"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 10,
    instructions: "Type each letter or pair exactly as shown, with a space after each group. Fingers return to f and j every time.",
    aim: { correctPerMin: 40, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 2: D & K (middle fingers) ----
  {
    id: "v2-s02-dk-drill",
    name: "Stage 2: D and K",
    type: "wordbank",
    content: ["d", "k", "dd", "kk", "dk", "kd", "fd", "jk", "kf", "dj"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 10,
    instructions: "Type each group as shown. New keys d and k, mixed with f and j review.",
    aim: { correctPerMin: 40, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 3: S & L (ring fingers) ----
  {
    id: "v2-s03-sl-drill",
    name: "Stage 3: S and L",
    type: "wordbank",
    content: ["s", "l", "ss", "ll", "sl", "ls", "sd", "lk", "fs", "jl"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 10,
    instructions: "Type each group as shown. New keys s and l, mixed with d and k review.",
    aim: { correctPerMin: 40, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 4: A & ; (pinky fingers) - first real words ----
  {
    id: "v2-s04-a-semicolon-drill",
    name: "Stage 4: A and ;",
    type: "wordbank",
    content: ["a", ";", "aa", ";;", "a;", ";a", "as", "l;", "fa", "j;"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown. New keys a and semicolon, mixed with s and l review.",
    aim: { correctPerMin: 40, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s04-a-semicolon-words",
    name: "Stage 4 words: A and ;",
    type: "wordbank",
    // A semicolon never occurs inside a real word, so a bank of single
    // words - unlike every other letter-pair stage - would silently drop
    // the ";" half of this pinpoint during the apply-to-real-words phase.
    // A few entries pair two already-real words with a semicolon between
    // them (word; word) - not a full clause, since only 7 letters exist
    // yet to write one, but typographically the same reach: finish a word,
    // strike ; with the right pinky, space, keep going.
    content: ["as", "all", "ask", "add", "dad", "sad", "lad", "fall", "falls", "salad", "flask", "dads", "dad; sad", "lad; all", "ask; add", "salad; flask"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 5: G & H (index reach to the middle) - home row complete ----
  {
    id: "v2-s05-gh-drill",
    name: "Stage 5: G and H",
    type: "wordbank",
    content: ["g", "h", "gg", "hh", "gh", "hg", "fg", "jh", "ah", "ha"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown. New keys g and h. Home row is now complete.",
    aim: { correctPerMin: 40, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s05-gh-words",
    name: "Stage 5 words: G and H",
    type: "wordbank",
    content: ["had", "has", "gas", "glad", "hall", "half", "flag", "flash", "glass", "shall", "dash", "hash"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Checkpoint A: home row review (retention probe) ----
  // Run periodically after stage 5. If this stays fluent, move on; if it
  // sags while the current stage climbs, schedule home-row review.
  {
    id: "v2-checkpoint-a-letters",
    name: "Checkpoint A: home row letters",
    type: "wordbank",
    content: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Random letters from the whole home row. Type each one as it appears.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },
  {
    id: "v2-checkpoint-a-words",
    name: "Checkpoint A: home row words",
    type: "wordbank",
    content: ["as", "all", "had", "has", "ask", "dad", "sad", "glad", "fall", "salad", "flag", "shall", "glass", "half", "dash", "flask"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 60,
    instructions: "A mix of every home-row word so far. Type them as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },

  // ---- Stage 6: E & I (top row begins - highest-payoff vowels) ----
  {
    id: "v2-s06-ei-drill",
    name: "Stage 6: E and I",
    type: "wordbank",
    content: ["e", "i", "ee", "ii", "ei", "ie", "ed", "ik", "de", "ki"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown, reaching up from d and k.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s06-ei-words",
    name: "Stage 6 words: E and I",
    type: "wordbank",
    content: ["is", "his", "if", "he", "she", "did", "like", "said", "life", "side", "held", "idea"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 7: R & U (index fingers, reach up) ----
  {
    id: "v2-s07-ru-drill",
    name: "Stage 7: R and U",
    type: "wordbank",
    content: ["r", "u", "rr", "uu", "ru", "ur", "fr", "ju", "rf", "uj"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown, reaching up from f and j.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s07-ru-words",
    name: "Stage 7 words: R and U",
    type: "wordbank",
    content: ["are", "her", "us", "use", "red", "sure", "here", "read", "girl", "hair", "fire", "rush"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 8: T & Y (index fingers, inward stretch) ----
  {
    id: "v2-s08-ty-drill",
    name: "Stage 8: T and Y",
    type: "wordbank",
    content: ["t", "y", "tt", "yy", "ty", "yt", "ft", "jy", "tf", "yj"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s08-ty-words",
    name: "Stage 8 words: T and Y",
    type: "wordbank",
    content: ["the", "that", "this", "it", "at", "they", "there", "yes", "get", "just", "little", "try"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 9: W & O (ring fingers, reach up) ----
  {
    id: "v2-s09-wo-drill",
    name: "Stage 9: W and O",
    type: "wordbank",
    content: ["w", "o", "ww", "oo", "wo", "ow", "sw", "lo", "ws", "ol"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s09-wo-words",
    name: "Stage 9 words: W and O",
    type: "wordbank",
    content: ["to", "of", "do", "so", "we", "you", "was", "what", "with", "for", "out", "would"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 10: N & B (index fingers, reach down) ----
  // Moved up from the end of the old sequence: n is the 6th most frequent
  // letter in English and unlocks the most common words in the language.
  {
    id: "v2-s10-nb-drill",
    name: "Stage 10: N and B",
    type: "wordbank",
    content: ["n", "b", "nn", "bb", "nb", "bn", "jn", "fb", "nj", "bf"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown, reaching down and in from f and j.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s10-nb-words",
    name: "Stage 10 words: N and B",
    type: "wordbank",
    content: ["and", "in", "on", "an", "not", "but", "one", "new", "now", "then", "when", "than"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Checkpoint B: twenty keys (retention probe) ----
  // At this point the most common English words are all available.
  {
    id: "v2-checkpoint-b-letters",
    name: "Checkpoint B: all keys so far",
    type: "wordbank",
    content: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "e", "i", "r", "u", "t", "y", "w", "o", "n", "b"],
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Random letters from every key learned so far. Type each one as it appears.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },
  {
    id: "v2-checkpoint-b-words",
    name: "Checkpoint B: most common words",
    type: "wordbank",
    content: ["the", "and", "to", "of", "in", "is", "you", "that", "it", "was", "for", "with", "on", "not", "this", "but", "are", "at", "one", "when"],
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "The most common English words. Type them as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },

  // ---- Stage 11: V & M (index fingers, reach down) ----
  {
    id: "v2-s11-vm-drill",
    name: "Stage 11: V and M",
    type: "wordbank",
    content: ["v", "m", "vv", "mm", "vm", "mv", "fv", "jm", "vf", "mj"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown, reaching down from f and j.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s11-vm-words",
    name: "Stage 11 words: V and M",
    type: "wordbank",
    content: ["me", "my", "am", "more", "some", "time", "them", "from", "have", "very", "over", "make"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 12: C & , (middle fingers, reach down) ----
  {
    id: "v2-s12-c-comma-drill",
    name: "Stage 12: C and ,",
    type: "wordbank",
    content: ["c", ",", "cc", ",,", "c,", "dc", "k,", "cd", ",k"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown. New keys c and comma.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s12-c-comma-words",
    name: "Stage 12 words: C and ,",
    type: "wordbank",
    // A comma never occurs inside a real word, so pure single-word entries
    // would drop the "," half of this pinpoint (see the same fix and its
    // rationale on v2-s04-a-semicolon-words). A few entries pair two
    // already-real words from this same bank into a short comma-separated
    // list - a comma's most natural use - keeping the reach in rotation.
    content: ["can", "come", "could", "much", "such", "each", "which", "because", "once", "call", "nice", "back", "come, call", "much, such", "each, which", "once, nice"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 13: Q & P (pinky fingers) - top row complete ----
  {
    id: "v2-s13-qp-drill",
    name: "Stage 13: Q and P",
    type: "wordbank",
    content: ["q", "p", "qq", "pp", "qp", "pq", "aq", ";p", "qa", "p;"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown. Top row is now complete.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s13-qp-words",
    name: "Stage 13 words: Q and P",
    type: "wordbank",
    content: ["up", "people", "put", "part", "play", "place", "help", "keep", "stop", "open", "quite", "quick"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 14: X & . (ring fingers, reach down) ----
  {
    id: "v2-s14-x-period-drill",
    name: "Stage 14: X and .",
    type: "wordbank",
    content: ["x", ".", "xx", "..", "x.", "sx", "l.", "xs", ".l"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown. New keys x and period.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s14-x-period-words",
    name: "Stage 14 words: X and .",
    type: "wordbank",
    // A period never occurs inside a real word, so pure single-word entries
    // would drop the "." half of this pinpoint (see v2-s04-a-semicolon-words
    // for the same fix and its rationale). A few entries pair two
    // already-real words from this bank as two short sentence-like
    // fragments. Real capitalized sentences with periods arrive properly
    // at Stage 18, once shift (Stage 16) is taught - these just keep the
    // period-then-space reach in rotation until then.
    content: ["six", "fix", "mix", "next", "box", "text", "extra", "exact", "fix. mix", "six. box", "next. text", "extra. exact"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 15: Z & / (pinky fingers, reach down) - all 26 letters ----
  {
    id: "v2-s15-z-slash-drill",
    name: "Stage 15: Z and /",
    type: "wordbank",
    content: ["z", "/", "zz", "//", "z/", "az", ";/", "za", "/;"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each group as shown. All 26 letters are now covered.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s15-z-slash-words",
    name: "Stage 15 words: Z and /",
    type: "wordbank",
    // A slash never occurs inside a real word, so pure single-word entries
    // would drop the "/" half of this pinpoint (see v2-s04-a-semicolon-words
    // for the same fix and its rationale). A few entries pair two
    // already-real words from this bank with a slash between them, no
    // spaces - the familiar "and/or"-style usage - keeping the reach in
    // rotation.
    content: ["size", "zoo", "prize", "quiz", "lazy", "crazy", "zero", "dozen", "zoo/zero", "prize/quiz", "lazy/crazy", "size/dozen"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Checkpoint C: full alphabet (retention probe) ----
  {
    id: "v2-checkpoint-c-letters",
    name: "Checkpoint C: all 26 letters",
    type: "wordbank",
    content: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Random letters from the whole alphabet. Type each one as it appears.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },
  {
    id: "v2-checkpoint-c-words",
    name: "Checkpoint C: mixed words",
    type: "wordbank",
    content: ["they", "have", "from", "which", "would", "people", "because", "time", "make", "know", "think", "over", "next", "quick", "size", "very"],
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Common words drawing on the whole alphabet. Type them as they appear.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },

  // ---- Stage 16: Shift & capitals ----
  {
    id: "v2-s16-shift-drill",
    name: "Stage 16: Shift and capitals",
    type: "wordbank",
    content: ["Ff", "Jj", "Dd", "Kk", "Ss", "Ll", "Aa", "Hh", "Ee", "Tt"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Capital then lowercase. Use the shift key on the opposite hand from the letter.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  // Names split evenly between left-hand capitals (right shift) and
  // right-hand capitals (left shift), so both shift keys get practice.
  {
    id: "v2-s16-shift-words",
    name: "Stage 16 words: capitalized names",
    type: "wordbank",
    content: ["Ben", "Grace", "Sara", "Emma", "Fred", "Jack", "Kevin", "Max", "Nora", "Liam"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type each name with a capital first letter.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 17: Apostrophes & sentence punctuation ----
  {
    id: "v2-s17-punctuation-drill",
    name: "Stage 17: Punctuation",
    type: "wordbank",
    content: ["Really?", "Okay.", "Wait!", "Yes!", "No.", "Why?"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Type each word with its capital and end punctuation.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s17-punctuation-words",
    name: "Stage 17 words: contractions",
    type: "wordbank",
    content: ["can't", "don't", "won't", "isn't", "it's", "didn't", "that's", "I'm"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type each contraction, including the apostrophe.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Stage 18: Full sentences (composition / generalization probes) ----
  {
    id: "v2-s18-sentence-fox",
    name: "Stage 18: Sentence - quick brown fox",
    type: "text",
    content: "The quick brown fox jumps over the lazy dog.",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the sentence, including capitals and punctuation.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s18-sentence-seashells",
    name: "Stage 18: Sentence - seashells",
    type: "text",
    content: "She sells seashells by the seashore.",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the sentence, including capitals and punctuation.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-s18-sentence-stars",
    name: "Stage 18: Sentence - night sky",
    type: "text",
    content: "Bright stars filled the quiet night sky.",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type the sentence, including capitals and punctuation.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Benchmark: course entry & graduation probe ----
  // A standard probe, last in the list on purpose: everyone types it on
  // day one (baseline) and then periodically (e.g. every Friday) on its
  // own line of the celeration chart. It samples randomly from
  // benchmark_sentences.txt, a pool engineered so all 26 letters, capitals
  // on both hands, and . , ' ? ! each appear often enough for the
  // most-missed-keys and slowest-keys breakdowns to be diagnostic - those
  // breakdowns tell you which stage drills to assign next.
  //
  // CLASS RULE: nobody practices on this pool. It only stays a
  // generalization probe if the sentences remain unfamiliar.
  //
  // SUGGESTED GRADUATION CRITERION (a starting hypothesis - adjust it from
  // your first cohort's charts):
  //   - >= 150 correct keystrokes/min (~30 WPM) with <= 2 errors/min
  //     on the 60 s timing, met on THREE separate class days, and
  //   - the same rates held at least once on the 120 s endurance timing.
  {
    id: "v2-benchmark-probe",
    name: "Benchmark: entry and graduation probe",
    type: "wordbank",
    source: "benchmark_sentences.txt",
    durations: [60, 120],
    defaultDuration: 60,
    instructions: "Type each sentence as it appears, including capitals and punctuation. Just do your best - this one is for the chart.",
    aim: { correctPerMin: 150, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },

  // ---- Numbers & symbols: the number row (post-graduation) ----
  // Placed after the benchmark on purpose: the number row is for students
  // who have graduated from the 18 letter stages. The progression mirrors
  // the letter curriculum's finger-pair symmetry - index fingers first
  // (4 & 7), then middle (3 & 8), ring (2 & 9), pinkies (1 & 0), and the
  // long index stretches (5 & 6) last, since those are the hardest reaches.
  //
  // Drills stay digit-pure except for the home-row anchor letter (f4, j7,
  // ...) - the pinpointed behavior is the reach FROM home and back, so the
  // anchor is part of the behavior, not a distraction. The "words" banks
  // then deliberately re-mix digits into words and phrases, because that's
  // how numbers occur in real typing - same acquisition-then-application
  // split as the letter stages.
  {
    id: "v2-n01-47-drill",
    name: "Numbers 1: 4 and 7",
    type: "wordbank",
    content: ["4", "7", "44", "77", "47", "74", "f4", "j7"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Reach up from f to 4 and from j to 7, and come straight back home. Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-n02-38-drill",
    name: "Numbers 2: 3 and 8",
    type: "wordbank",
    content: ["3", "8", "33", "88", "38", "83", "d3", "k8", "34", "78"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Middle fingers reach from d to 3 and from k to 8. Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-n03-29-drill",
    name: "Numbers 3: 2 and 9",
    type: "wordbank",
    content: ["2", "9", "22", "99", "29", "92", "s2", "l9", "23", "89"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Ring fingers reach from s to 2 and from l to 9. Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-n04-10-drill",
    name: "Numbers 4: 1 and 0",
    type: "wordbank",
    content: ["1", "0", "11", "00", "10", "01", "a1", ";0", "12", "90"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Pinkies reach from a to 1 and from ; to 0. Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-n05-56-drill",
    name: "Numbers 5: 5 and 6",
    type: "wordbank",
    content: ["5", "6", "55", "66", "56", "65", "f5", "j6", "45", "67"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "The longest stretches: index fingers reach from f to 5 and from j to 6. Type each group as shown.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Numbers checkpoint (retention probe, assessment) ----
  // Cumulative over all ten digits, single digits and realistic multi-digit
  // strings mixed. Same role as checkpoints A-C: run it periodically once
  // all five digit stages are done.
  {
    id: "v2-checkpoint-n-digits",
    name: "Numbers checkpoint: all ten digits",
    type: "wordbank",
    content: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "25", "47", "83", "365", "1776", "2026", "8050"],
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Random numbers using every digit. Type each one as it appears.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 60,
    assessment: true
  },
  {
    id: "v2-n-words-context",
    name: "Numbers words: numbers in context",
    type: "wordbank",
    content: ["7 days", "24 hours", "12 eggs", "365 days", "page 42", "Room 101", "May 4", "60 seconds", "since 1776", "10 out of 10"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type each phrase as it appears, numbers and all.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Symbols on the number keys (shift + digit) ----
  // Same keys and fingers as the digits just learned, plus the
  // opposite-hand shift from stage 16. Split by real-world frequency:
  // $ % & ! first, then the rarer ( ) @ # * ^.
  {
    id: "v2-sym1-drill",
    name: "Symbols 1: $ % & !",
    type: "wordbank",
    content: ["$", "%", "&", "!", "$5", "$40", "50%", "100%"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Hold shift with the opposite hand while the reaching finger strikes the number key.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-sym2-drill",
    name: "Symbols 2: ( ) @ # * ^",
    type: "wordbank",
    content: ["(", ")", "()", "@", "#", "*", "^", "(a)", "#1", "2*3"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 15,
    instructions: "Hold shift with the opposite hand while the reaching finger strikes the number key.",
    aim: { correctPerMin: 60, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },
  {
    id: "v2-sym-words-context",
    name: "Symbols words: symbols in context",
    type: "wordbank",
    content: ["$5", "$20", "100%", "50% off", "Sam & Al", "#1 fan", "(yes)", "(not yet)", "2 * 2", "me@school.org"],
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 30,
    instructions: "Type each phrase exactly, symbols included.",
    aim: { correctPerMin: 70, maxIncorrectPerMin: 2 },
    aimTiming: 30
  },

  // ---- Extra: beyond the 18-stage curriculum ----
  // These stay last in the list on purpose - they're for students who have
  // finished all 18 stages above.
  {
    id: "v2-extra-sentences-common-words",
    name: "Extra: Sentences (common words)",
    type: "wordbank",
    source: "sentences_top_english_words.txt",
    durations: [10, 15, 20, 30, 60],
    defaultDuration: 60,
    instructions: "Type each sentence as it appears, including capitals and punctuation.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 60
  },
  {
    id: "v2-extra-passage-alice-in-wonderland",
    name: "Extra: Passage - Alice in Wonderland",
    type: "text",
    source: "passage_alice_in_wonderland.txt",
    durations: [10, 15, 20, 30, 60, 120],
    defaultDuration: 60,
    instructions: "Type the passage. If you reach the end before time is up, it repeats from the start.",
    aim: { correctPerMin: 90, maxIncorrectPerMin: 2 },
    aimTiming: 60
  }
];
