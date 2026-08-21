// student_achievement_tracker.typ
// A student-facing checklist of every pinpoint in tests.js, for tracking
// which aims have been met over the course of the class.
// Compile with:  typst compile student_achievement_tracker.typ
//
// Regenerating after tests.js changes: the row data below (id, pinpoint
// name, aim, assessment flag) is copied by hand from tests.js. There is no
// build step - if you add, remove, or re-tier a pinpoint there, mirror the
// change in the `rows` array below.
#import "pt_style.typ": *

#show: doc.with(
  kind: "Achievement Tracker",
  title: "Typing Achievement Tracker",
  margins: (x: 0.7in, top: 0.95in, bottom: 0.9in),
)

#titleblock(
  "Precision Teaching · Typing Course",
  [Typing Achievement Tracker],
  subtitle: [Every pinpoint in the course, in order — your own record of what you've earned],
)
#v(1.3em)

#grid(
  columns: (2fr, 1fr, 1.4fr, 1fr),
  column-gutter: 18pt,
  field("Student"), field("Class / period"), field("Teacher"), field("Start date"),
)
#v(0.9em)

#callout("How to use this chart")[
  This is your own record of the course — not a replacement for your Standard Celeration Chart, which is still where your *daily* numbers go. Fill in a row here the day you first *meet its aim*: the date, your correct/min and error/min from that sprint, and your initials. Rows tagged #tag[Probe] are the benchmark and checkpoint pinpoints — your teacher runs these on a schedule, so check with them before recording one.
]
#v(0.3em)

// ---- worked example ----
#text(size: 8.5pt, fill: ink-mute, style: "italic")[Example of a completed row:]
#v(3pt)
#table(
  columns: (0.32in, 1fr, 1.15in, 0.95in, 0.85in, 0.7in, 0.6in),
  align: (center, left, center, center, center, center, center),
  stroke: 0.6pt + rule,
  inset: (x: 6pt, y: 6pt),
  [#text(fill: ink-faint)[4]],
  [#text(fill: ink-faint, style: "italic")[Drill: a ;]],
  [#text(fill: ink-faint)[≥40 / ≤2]],
  [#text(fill: ink-faint)[Sep 12]],
  [#text(fill: ink-faint)[46]],
  [#text(fill: ink-faint)[1]],
  [#text(fill: ink-faint)[J.W.]],
)
#v(0.9em)

// ---- helpers for building the main table ----
#let group(title) = table.cell(colspan: 7, fill: panel-strong, inset: (x: 8pt, y: 6pt))[
  #text(weight: "bold", size: 9.5pt, fill: ink, tracking: 0.2pt)[#title]
]

#let row(n, label, aim, is-probe) = {
  let bg = if is-probe { panel } else { none }
  let badge = if is-probe [ #tag[Probe]] else []
  (
    table.cell(fill: bg)[#text(size: 9pt, fill: ink-mute)[#n]],
    table.cell(fill: bg)[#label#badge],
    table.cell(fill: bg)[#text(size: 9.5pt)[#aim]],
    table.cell(fill: bg)[],
    table.cell(fill: bg)[],
    table.cell(fill: bg)[],
    table.cell(fill: bg)[],
  )
}

#let rows = (
  group("Benchmark Probe — Entry & Graduation"),
  ..row(1, "Benchmark sentences", "≥150 / ≤2", true),
  group("Stage 1 — Home Row: F & J"),
  ..row(2, "Drill: f j", "≥40 / ≤2", false),
  group("Stage 2 — Home Row: D & K"),
  ..row(3, "Drill: d k", "≥40 / ≤2", false),
  group("Stage 3 — Home Row: S & L"),
  ..row(4, "Drill: s l", "≥40 / ≤2", false),
  group("Stage 4 — Home Row: A & ;"),
  ..row(5, "Drill: a ;", "≥40 / ≤2", false),
  ..row(6, "Words", "≥70 / ≤2", false),
  group("Stage 5 — Home Row: G & H  (home row complete)"),
  ..row(7, "Drill: g h", "≥40 / ≤2", false),
  ..row(8, "Words", "≥70 / ≤2", false),
  group("Checkpoint A — Home Row Review"),
  ..row(9, "Letters (whole home row)", "≥70 / ≤2", true),
  ..row(10, "Words (whole home row)", "≥70 / ≤2", true),
  group("Stage 6 — Top Row: E & I"),
  ..row(11, "Drill: e i", "≥60 / ≤2", false),
  ..row(12, "Words", "≥70 / ≤2", false),
  group("Stage 7 — Top Row: R & U"),
  ..row(13, "Drill: r u", "≥60 / ≤2", false),
  ..row(14, "Words", "≥70 / ≤2", false),
  group("Stage 8 — Top Row: T & Y"),
  ..row(15, "Drill: t y", "≥60 / ≤2", false),
  ..row(16, "Words", "≥70 / ≤2", false),
  group("Stage 9 — Top Row: W & O"),
  ..row(17, "Drill: w o", "≥60 / ≤2", false),
  ..row(18, "Words", "≥70 / ≤2", false),
  group("Stage 10 — N & B"),
  ..row(19, "Drill: n b", "≥60 / ≤2", false),
  ..row(20, "Words", "≥70 / ≤2", false),
  group("Checkpoint B — Twenty Keys Review"),
  ..row(21, "Letters (20 keys so far)", "≥70 / ≤2", true),
  ..row(22, "Words (most common)", "≥70 / ≤2", true),
  group("Stage 11 — V & M"),
  ..row(23, "Drill: v m", "≥60 / ≤2", false),
  ..row(24, "Words", "≥70 / ≤2", false),
  group("Stage 12 — C & ,"),
  ..row(25, "Drill: c ,", "≥60 / ≤2", false),
  ..row(26, "Words", "≥70 / ≤2", false),
  group("Stage 13 — Q & P"),
  ..row(27, "Drill: q p", "≥60 / ≤2", false),
  ..row(28, "Words", "≥70 / ≤2", false),
  group("Stage 14 — X & ."),
  ..row(29, "Drill: x .", "≥60 / ≤2", false),
  ..row(30, "Words", "≥70 / ≤2", false),
  group("Stage 15 — Z & /  (all 26 letters complete)"),
  ..row(31, "Drill: z /", "≥60 / ≤2", false),
  ..row(32, "Words", "≥70 / ≤2", false),
  group("Checkpoint C — Full Alphabet Review"),
  ..row(33, "Letters (all 26)", "≥70 / ≤2", true),
  ..row(34, "Words (mixed alphabet)", "≥70 / ≤2", true),
  group("Stage 16 — Shift & Capitals"),
  ..row(35, "Drill: shift + capitals", "≥90 / ≤2", false),
  ..row(36, "Words: capitalized names", "≥90 / ≤2", false),
  group("Stage 17 — Punctuation & Contractions"),
  ..row(37, "Drill: end punctuation", "≥90 / ≤2", false),
  ..row(38, "Words: contractions", "≥90 / ≤2", false),
  group("Stage 18 — Full Sentences"),
  ..row(39, "Sentence: quick brown fox", "≥90 / ≤2", false),
  ..row(40, "Sentence: seashells", "≥90 / ≤2", false),
  ..row(41, "Sentence: night sky", "≥90 / ≤2", false),
  group("Extra — Beyond the Course"),
  ..row(42, "Sentences (common words)", "≥90 / ≤2", false),
  ..row(43, "Passage: Alice in Wonderland", "≥90 / ≤2", false),
)

// ---- main table ----
#table(
  columns: (0.32in, 1fr, 1.15in, 0.95in, 0.85in, 0.7in, 0.6in),
  align: (center, left, center, center, center, center, center),
  stroke: 0.6pt + rule,
  inset: (x: 6pt, y: 6.5pt),
  table.header(
    repeat: true,
    th[\#], th[Pinpoint], th[Aim #sym.arrow.r.long correct/err per min], th[Date met], th[Correct/min], th[Err/min], th[Init.],
  ),
  ..rows
)

#v(0.6em)
#line(length: 100%, stroke: 0.5pt + rule)
#v(0.35em)
#text(size: 8.3pt, fill: ink-mute)[
  Aims are starting hypotheses, not pass/fail cutoffs — see your Standard Celeration Chart for how you're really trending. #tag[Probe] rows are the benchmark and the three checkpoints. Generated from the revision-2 pinpoint set (#raw("tests.js")) — keep in sync if your class's pinpoints change.
]
