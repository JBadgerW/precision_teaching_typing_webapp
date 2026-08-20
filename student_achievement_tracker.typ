// student_achievement_tracker.typ
// A student-facing checklist of every pinpoint in tests.js, for tracking
// which aims have been met over the course of the class.
// Compile with:  typst compile student_achievement_tracker.typ
//
// Regenerating after tests.js changes: the row data below (id, pinpoint
// name, aim, assessment flag) is copied by hand from tests.js. There is no
// build step - if you add, remove, or re-tier a pinpoint there, mirror the
// change in the `rows` array below.

#set document(title: "Achievement Tracker: Precision Teaching Typing", author: "Precision Teaching Typing Webapp")
#set page(
  paper: "us-letter",
  margin: (x: 0.75in, top: 0.8in, bottom: 0.6in),
  numbering: "1 / 1",
  header: context [
    #if here().page() > 1 [
      #align(right)[
        #text(size: 8pt, fill: luma(140))[Typing Achievement Tracker]
      ]
      #v(-2pt)
      #line(length: 100%, stroke: 0.5pt + luma(210))
    ]
  ],
)
#set text(size: 10pt)
#set par(justify: false)

#let accent = rgb("#2563eb")
#let accent-deep = rgb("#1d4ed8")
#let accent-tint = rgb("#eaf1fd")
#let probe-tint = rgb("#fff3dc")
#let probe-ink = rgb("#8a5a00")
#let rule-gray = luma(205)

// ---- title block ----
#align(center)[
  #text(size: 21pt, weight: "bold", hyphenate: false)[Typing Achievement Tracker]
  #v(3pt)
  #text(size: 11.5pt, fill: luma(90))[Precision Teaching Typing — every pinpoint in the course, in order]
]
#v(0.6em)

// ---- student info fields ----
#let field(label) = box(width: 100%)[
  #text(size: 8.5pt, fill: luma(110), tracking: 0.3pt)[#upper(label)]
  #v(-1pt)
  #line(length: 100%, stroke: 0.6pt + rule-gray)
]

#grid(
  columns: (2fr, 1fr, 1.4fr, 1fr),
  column-gutter: 16pt,
  field("Student"), field("Class / period"), field("Teacher"), field("Start date"),
)
#v(0.7em)

// ---- how-to box (styled after the teacher guide's callout) ----
#block(
  fill: luma(247),
  stroke: (left: 2.5pt + accent),
  inset: (x: 12pt, y: 8pt),
  radius: 2pt,
  width: 100%,
)[
  #text(weight: "bold", size: 9pt, tracking: 0.5pt, fill: accent-deep)[HOW TO USE THIS CHART]
  #par(leading: 0.5em)[
    #text(size: 9.5pt)[
      This is your own record of the course — not a replacement for your Standard Celeration Chart, which is still where your *daily* numbers go. Fill in a row here the day you first *meet its aim*: the date, your correct/min and error/min from that sprint, and your initials. Rows tagged #box(fill: probe-tint, outset: (x: 2pt, y: 1.5pt), radius: 2pt)[#text(size: 6.5pt, weight: "bold", fill: probe-ink)[PROBE]] are the benchmark and checkpoint pinpoints — your teacher runs these on a schedule, so check with them before recording one.
    ]
  ]
]
#v(0.6em)

// ---- worked example ----
#text(size: 8.5pt, fill: luma(110), style: "italic")[Example of a completed row:]
#v(2pt)
#table(
  columns: (0.34in, 1fr, 1.05in, 0.85in, 0.8in, 0.65in, 0.55in),
  align: (center, left, center, center, center, center, center),
  stroke: 0.6pt + rule-gray,
  inset: 5pt,
  [#text(fill: luma(130))[4]],
  [#text(fill: luma(130), style: "italic")[Drill: a ;]],
  [#text(fill: luma(130))[≥40 / ≤2]],
  [#text(fill: luma(130))[Sep 12]],
  [#text(fill: luma(130))[46]],
  [#text(fill: luma(130))[1]],
  [#text(fill: luma(130))[J.W.]],
)
#v(0.7em)

// ---- helpers for building the main table ----
#let group(title) = (
  table.cell(
    colspan: 7,
    fill: accent-tint,
    inset: (x: 7pt, y: 5pt),
  )[#text(weight: "bold", size: 9pt, fill: accent-deep)[#title]],
)

#let row(n, label, aim, is-probe) = {
  let bg = if is-probe { probe-tint } else { none }
  let badge = if is-probe [ #box(fill: rgb("#fde3ad"), outset: (x: 2pt, y: 1.5pt), radius: 2pt)[#text(size: 6pt, weight: "bold", fill: probe-ink)[PROBE]]] else []
  (
    table.cell(fill: bg)[#text(size: 8.5pt, fill: luma(120))[#n]],
    table.cell(fill: bg)[#label#badge],
    table.cell(fill: bg)[#text(size: 9pt)[#aim]],
    table.cell(fill: bg)[],
    table.cell(fill: bg)[],
    table.cell(fill: bg)[],
    table.cell(fill: bg)[],
  )
}

#let rows = (
  ..group("Benchmark Probe — Entry & Graduation"),
  ..row(1, "Benchmark sentences", "≥150 / ≤2", true),
  ..group("Stage 1 — Home Row: F & J"),
  ..row(2, "Drill: f j", "≥40 / ≤2", false),
  ..group("Stage 2 — Home Row: D & K"),
  ..row(3, "Drill: d k", "≥40 / ≤2", false),
  ..group("Stage 3 — Home Row: S & L"),
  ..row(4, "Drill: s l", "≥40 / ≤2", false),
  ..group("Stage 4 — Home Row: A & ;"),
  ..row(5, "Drill: a ;", "≥40 / ≤2", false),
  ..row(6, "Words", "≥70 / ≤2", false),
  ..group("Stage 5 — Home Row: G & H  (home row complete)"),
  ..row(7, "Drill: g h", "≥40 / ≤2", false),
  ..row(8, "Words", "≥70 / ≤2", false),
  ..group("Checkpoint A — Home Row Review"),
  ..row(9, "Letters (whole home row)", "≥70 / ≤2", true),
  ..row(10, "Words (whole home row)", "≥70 / ≤2", true),
  ..group("Stage 6 — Top Row: E & I"),
  ..row(11, "Drill: e i", "≥60 / ≤2", false),
  ..row(12, "Words", "≥70 / ≤2", false),
  ..group("Stage 7 — Top Row: R & U"),
  ..row(13, "Drill: r u", "≥60 / ≤2", false),
  ..row(14, "Words", "≥70 / ≤2", false),
  ..group("Stage 8 — Top Row: T & Y"),
  ..row(15, "Drill: t y", "≥60 / ≤2", false),
  ..row(16, "Words", "≥70 / ≤2", false),
  ..group("Stage 9 — Top Row: W & O"),
  ..row(17, "Drill: w o", "≥60 / ≤2", false),
  ..row(18, "Words", "≥70 / ≤2", false),
  ..group("Stage 10 — N & B"),
  ..row(19, "Drill: n b", "≥60 / ≤2", false),
  ..row(20, "Words", "≥70 / ≤2", false),
  ..group("Checkpoint B — Twenty Keys Review"),
  ..row(21, "Letters (20 keys so far)", "≥70 / ≤2", true),
  ..row(22, "Words (most common)", "≥70 / ≤2", true),
  ..group("Stage 11 — V & M"),
  ..row(23, "Drill: v m", "≥60 / ≤2", false),
  ..row(24, "Words", "≥70 / ≤2", false),
  ..group("Stage 12 — C & ,"),
  ..row(25, "Drill: c ,", "≥60 / ≤2", false),
  ..row(26, "Words", "≥70 / ≤2", false),
  ..group("Stage 13 — Q & P"),
  ..row(27, "Drill: q p", "≥60 / ≤2", false),
  ..row(28, "Words", "≥70 / ≤2", false),
  ..group("Stage 14 — X & ."),
  ..row(29, "Drill: x .", "≥60 / ≤2", false),
  ..row(30, "Words", "≥70 / ≤2", false),
  ..group("Stage 15 — Z & /  (all 26 letters complete)"),
  ..row(31, "Drill: z /", "≥60 / ≤2", false),
  ..row(32, "Words", "≥70 / ≤2", false),
  ..group("Checkpoint C — Full Alphabet Review"),
  ..row(33, "Letters (all 26)", "≥70 / ≤2", true),
  ..row(34, "Words (mixed alphabet)", "≥70 / ≤2", true),
  ..group("Stage 16 — Shift & Capitals"),
  ..row(35, "Drill: shift + capitals", "≥90 / ≤2", false),
  ..row(36, "Words: capitalized names", "≥90 / ≤2", false),
  ..group("Stage 17 — Punctuation & Contractions"),
  ..row(37, "Drill: end punctuation", "≥90 / ≤2", false),
  ..row(38, "Words: contractions", "≥90 / ≤2", false),
  ..group("Stage 18 — Full Sentences"),
  ..row(39, "Sentence: quick brown fox", "≥90 / ≤2", false),
  ..row(40, "Sentence: seashells", "≥90 / ≤2", false),
  ..row(41, "Sentence: night sky", "≥90 / ≤2", false),
  ..group("Extra — Beyond the Course"),
  ..row(42, "Sentences (common words)", "≥90 / ≤2", false),
  ..row(43, "Passage: Alice in Wonderland", "≥90 / ≤2", false),
)

// ---- main table ----
#table(
  columns: (0.34in, 1fr, 1.05in, 0.85in, 0.8in, 0.65in, 0.55in),
  align: (center, left, center, center, center, center, center),
  stroke: 0.6pt + rule-gray,
  inset: (x: 5pt, y: 4pt),
  table.header(
    repeat: true,
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[\#]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Pinpoint]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Aim #sym.arrow.r.long correct/err per min]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Date met]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Correct/min]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Err/min]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Init.]],
  ),
  ..rows
)

#v(0.4em)
#line(length: 100%, stroke: 0.5pt + rule-gray)
#text(size: 8pt, fill: luma(120))[
  Aims are starting hypotheses, not pass/fail cutoffs — see your Standard Celeration Chart for how you're really trending. #box(fill: probe-tint, outset: (x: 2pt, y: 1.5pt), radius: 2pt)[#text(size: 6pt, weight: "bold", fill: probe-ink)[PROBE]] rows are the benchmark and the three checkpoints. Generated from the revision-2 pinpoint set (`tests.js`) — keep in sync if your class's pinpoints change.
]
