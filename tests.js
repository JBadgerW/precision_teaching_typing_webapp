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
// -----------------------------------------------------------------------

const TESTS = [
  {
    id: "home-row-fj",
    name: "F and J (home row)",
    type: "text",
    content: "f j",
    durations: [10, 15, 30],
    defaultDuration: 15,
    instructions: "Type f and j, alternating, as fast and accurately as you can."
  },
  {
    id: "home-row-asdf-jkl",
    name: "ASDF JKL; (home row)",
    type: "text",
    content: "asdf jkl;",
    durations: [15, 30, 60],
    defaultDuration: 30,
    instructions: "Type asdf jkl; over and over, keeping your fingers on home row."
  },
  {
    id: "digraph-th",
    name: "TH digraph",
    type: "text",
    content: "th",
    durations: [15, 30, 60],
    defaultDuration: 30,
    instructions: "Type th over and over."
  },
  {
    id: "wordbank-th-words",
    name: "Words with TH",
    type: "wordbank",
    content: ["the", "that", "this", "there", "think", "three", "through", "another"],
    durations: [30, 60],
    defaultDuration: 30,
    instructions: "Type the words as they appear, separated by spaces."
  }
];
