// teacher_guide.typ
// Compile with:  typst compile teacher_guide.typ
#set document(title: "Teacher's Guide: Precision Teaching Typing", author: "Precision Teaching Typing Webapp")
#set page(paper: "us-letter", margin: (x: 1in, y: 1in), numbering: "1")
#set text(size: 11pt)
#set par(justify: true)
#set heading(numbering: "1.1")
#show heading.where(level: 1): it => block(above: 1.6em, below: 0.8em)[#it]

// A callout box for Precision Teaching principles.
#let principle(title, body) = block(
  fill: luma(245),
  stroke: (left: 2.5pt + luma(120)),
  inset: (x: 12pt, y: 10pt),
  radius: 2pt,
  width: 100%,
)[
  #text(weight: "bold", size: 10pt, tracking: 0.5pt)[PT PRINCIPLE — #upper(title)] \
  #body
]

// Title block
#align(center)[
  #text(size: 22pt, weight: "bold", hyphenate: false)[Teaching Touch Typing \ with Precision Teaching] \
  #v(4pt)
  #text(size: 13pt)[A teacher's guide to the Precision Teaching Typing Webapp] \
  #v(2pt)
  #text(size: 10pt, fill: luma(100))[Written for the revision-2 pinpoint set (`tests.js`)]
]
#v(1.5em)

= What this guide is

This guide walks you through running a touch-typing course with the Precision Teaching Typing Webapp. It assumes no prior experience teaching typing. It covers the daily routine, the curriculum built into the app, how to read the results screen, how students chart their own progress, and — most importantly — how to make instructional decisions from the chart.

The one-sentence philosophy: *the app arranges practice and counts behavior; the chart makes the decisions; you are the one who acts on them.*

= Precision Teaching in five steps

Precision Teaching (PT) is not a curriculum. It is a measurement and decision-making system, and it maps onto typing unusually well. The whole method is:

+ *Pinpoint* a specific behavior. Not "practice typing," but "types `f` or `j` when shown either," or "types common words containing every key learned so far." Every entry in the app's test picker is one pinpoint.
+ *Arrange practice* on that pinpoint — short, frequent, focused.
+ *Time and count.* Every practice is a timed sprint. The app counts _correct keystrokes per minute_ and _incorrect keystrokes per minute_ — two separate numbers, never a percentage.
+ *Chart* both numbers daily on a Standard Celeration Chart (SCC), one chart line per pinpoint.
+ *Decide from the chart.* If corrects are accelerating and errors are low or falling, change nothing. If the picture stalls for three or four sessions, change something — and this guide tells you what to change.

#principle("rate, not percentage")[
  A student at "90% accuracy" could be typing 9 correct per minute or 90. Percentages hide fluency. Always talk with students about their two counts: corrects per minute and errors per minute. The goal is a high, rising correct rate _with_ a low error rate — never one without the other.
]

= What the app does (and deliberately does not do)

The student picks a pinpoint, picks a timing (10, 15, 20, 30, or 60 seconds; 120 for the long tests), clicks start, and types. When time expires the results screen shows:

- *Correct/min* and *Incorrect/min* — the two numbers that go on the chart.
- *Most-missed keys* — which expected keys produced the most wrong keystrokes.
- *Slowest keys* — which keys the student hesitated on notably longer than their own typical pace. (A key needs at least two timed appearances to be flagged, so short timings may not surface it; the 60-second timings give the most trustworthy breakdowns.)
- The typed passage itself, kept on screen so you and the student can review it together.

Two design decisions to know about:

*Backspace is disabled.* These are fluency sprints, not editing exercises. An error costs one wrong keystroke and the student simply continues. Tell students this on day one, or they will stall trying to fix mistakes.

*Nothing is recorded.* The app stores no data at all. This is intentional: students copy their own numbers onto their own paper charts. Self-recording and self-charting are part of the method — the chart belongs to the learner.

#principle("the learner knows best")[
  In PT, the student's data — not the teacher's impression, not the curriculum's schedule — decides what happens next. When a student charts their own performance and can see their own celeration, practice stops being something done _to_ them. Let students announce their own numbers, plot their own dots, and (with your guidance) call their own next moves.
]

= Materials and setup

Each student needs:

+ A Chromebook or other computer with the app open (the hosted URL or your local server). Remember that the file-backed tests require the app to be served over HTTP, not opened as a `file://` page.
+ A *Standard Celeration Chart* — the paper daily-per-minute chart. One chart can carry several pinpoints as separate lines; many teachers use one chart per student per term.
+ A pencil, and a folder to keep the chart in.

Chart conventions (keep them uniform across the class so charts are readable at a glance): a *dot* for corrects per minute, an *×* for errors per minute, one column per calendar day. Connect dots across days; the slope of that line is the *celeration* — the rate of learning itself.

Decide your class's *aims* before you start. The suggested starting aims (also in the comments at the top of `tests.js`) are:

#table(
  columns: (1fr, auto, auto, auto),
  align: (left, center, center, center),
  table.header([*Pinpoint type*], [*Correct/min aim*], [*Errors/min*], [*Certified at*]),
  [Letter drills (stages 1–15)], [50–70 (early stages may sit nearer 40)], [≤ 2], [30 s],
  [Word banks], [60–80], [≤ 2], [30 s],
  [Checkpoints A–C], [60–80], [≤ 2], [60 s],
  [Shift, punctuation, sentences], [80–100], [≤ 2], [30 s],
  [Number row and symbols (post-graduation)], [60–70], [≤ 2], [30 s (digits checkpoint: 60 s)],
  [Benchmark probe (graduation)], [≥ 150], [≤ 2], [60 s, held once at 120 s],
)

An aim only counts as *met* at the pinpoint's certification timing in the last column (the app shows it next to the aim on the results screen). Shorter timings are practice sprints: they produce chartable dots and they are where most of the learning happens, but they cannot certify a stage. Two reasons. First, a rate held for ten seconds is a burst, not fluency — *endurance* is part of the definition of a fluent performance. Second, arithmetic: the smallest non-zero rate a timing can record is 1 divided by its length, so one error in a 10 s sprint is already 6/min. The ≤ 2 errors/min criterion is literally unmeasurable below a 30 s timing.

These are *starting hypotheses*, not established standards. After your first cohort, adjust them from your own charts: an aim is right when students who reach it retain the skill, hold it for longer timings, and don't collapse at the next stage.

= Day one: the baseline

Before any instruction, every student takes the *Benchmark: entry and graduation probe*. It sits near the end of the test picker (after Stage 18, before the number-row pinpoints) so it isn't a daily temptation — on day one, direct students to it explicitly.

+ Explain the rules: fingers on the keyboard however they like today, backspace won't work, errors are fine, just keep going. Say explicitly that nobody is expected to do well — this timing exists so that, months from now, they can see how far they've come.
+ Run one 60-second timing. Have each student record on their chart: corrects/min, errors/min, and (on the back of the chart or a notes sheet) their top most-missed and slowest keys.
+ *Class rule, stated on day one: nobody practices on the benchmark.* It only measures real, generalized typing if its sentences stay unfamiliar. It reappears about once a week — never more.

The baseline also tells you where each student starts. A student who already types 80+/min with correct fingering can begin at a later stage or move quickly through the early ones (verify with Checkpoint A and B probes rather than guessing). Complete beginners start at Stage 1.

= Technique: the five things you actually coach

The app measures; it cannot see hands. Technique is your job, and there are only five things to watch:

+ *Home position.* Fingers curved and resting on `a s d f` and `j k l ;`, thumbs on the space bar. The index fingers find the bumps on `f` and `j` without looking. Every reach starts from and returns to home.
+ *Eyes on the screen, never the keyboard.* This is the single behavior that separates touch typists from hunt-and-peck typists, and the earlier you insist on it the cheaper it is. A sheet of paper taped over the hands works better than nagging.
+ *One finger, one key.* Each key belongs to exactly one finger. If you see an index finger wandering over to `s`, stop and reset — speed built on wrong fingering caps out early and is expensive to unlearn.
+ *Opposite-hand shift.* Capital letters typed with the shift key on the other hand (right shift for `A`, left shift for `J`). This matters from Stage 16 on.
+ *Relaxed rhythm.* Wrists floating, not planted; strokes light and even. Speed is a by-product of relaxed, correct, frequent repetition — it is never something to strain for inside a single timing.

Watch for these while students do their timings. A technique correction is worth more than any amount of extra practice on top of a bad habit.

= The curriculum map

The pinpoints in the picker follow this sequence. Each letter stage has a *drill* (random letters and letter-pairs — pure keystroke fluency) and, from Stage 4 on, a *words* bank (real words using only the keys taught so far).

#table(
  columns: (auto, auto, 1fr),
  align: (left, center, left),
  table.header([*Stage*], [*New keys*], [*Notes*]),
  [1–5], [`f j`, `d k`, `s l`, `a ;`, `g h`], [Home row, index fingers outward to pinkies. Home row complete at Stage 5.],
  [Checkpoint A], [—], [Home-row review probes: random letters, and every home-row word.],
  [6–9], [`e i`, `r u`, `t y`, `w o`], [Top row, highest-frequency letters first.],
  [10], [`n b`], [Deliberately early — unlocks _and, in, on, not, one, then, when, than, but_.],
  [Checkpoint B], [—], [Twenty-key probes. The words bank is the twenty most common English words.],
  [11–15], [`v m`, `c ,`, `q p`, `x .`, `z /`], [Remaining keys; the rarest letters come last. All 26 letters done at Stage 15.],
  [Checkpoint C], [—], [Full-alphabet probes: all 26 letters, and mixed common words.],
  [16], [Shift], [Capitals with the opposite-hand shift; a bank of capitalized names.],
  [17], [`' ? !`], [Contractions and end punctuation.],
  [18], [Sentences], [Three full practice sentences — the composite skill.],
  [Extra], [—], [Common-word sentences and a literature passage, for students past Stage 18.],
  [Benchmark], [—], [Entry/graduation probe. Weekly, never practiced.],
)

How to use a stage:

- *Start with the drill* at a short timing (10–15 s). Several sprints per session with a breath between each. Short timings mean more tries, more feedback, and less discouragement — a beginner asked to grind through a full minute on brand-new keys mostly practices frustration.
- *Add the words pinpoint* once the drill is moving (usually the same or next session), typically at 30 s. Words are where letter fluency becomes typing.
- *Chart one timing per pinpoint per day* — the best one is fine, and students trying to beat yesterday's dot is exactly the game you want. The other sprints are practice.
- *Run the matching checkpoint* about weekly once it's unlocked, and keep older stages warm with an occasional review sprint.

#principle("components before composites")[
  Typing a sentence is a composite of many component behaviors: single keystrokes, key sequences, words, capitals, punctuation. Fluent components combine almost for free; weak components put a hard ceiling on the composite. When a composite (words, sentences, benchmark) stalls, the cure is nearly always found one level down — isolate the weak component, bring it to its aim, and the composite usually jumps without being practiced directly.
]

= When to move on

Advance to the next stage when the current stage's pinpoints reach the aim *at the certification timing* — 30 s for stage drills and word banks, 60 s for checkpoints (see the table in section 4) — *on two consecutive days*, with errors at or under 2/min. One lucky sprint is not fluency, and a 10 s sprint cannot certify a stage at all: its record floor makes any error rate between 0 and 6/min unmeasurable. Sprint short, certify long.

Do not hold students hostage to perfection: if a student sits just under the aim but the celeration is clearly rising, moving on and letting the review checkpoints catch any slippage is usually better than grinding. Conversely, if a student clears a stage but the next checkpoint sags, that is the chart telling you to schedule review — see section 10.

= Reading the results screen

After every timing, three decisions can be read straight off the screen:

*The two rates → the chart.* Corrects/min and errors/min get plotted. Everything else is diagnosis.

*Most-missed keys → what to isolate.* If `r` heads the missed list day after day, the student runs the Stage 7 drill as a targeted sprint tomorrow — even if they're officially on Stage 11. Persistent misses usually mean wrong fingering: watch the hand, don't just reassign the drill.

*Slowest keys → where the hesitation lives.* Slow keys are keys the student finds by searching (often with a glance at the keyboard) rather than by reflex. Treat them exactly like missed keys: isolate with the matching stage drill at 10–15 s until the hesitation disappears. Remember slow-key data is only trustworthy from longer timings.

A useful review habit: the typed passage stays on the results screen — spend fifteen seconds with the student looking at _where_ the errors clustered. Errors bunched at one word or one reach mean something specific; errors sprinkled randomly usually just mean the student is at their current speed limit, which practice will raise.

= Charting and the decision rules

Have students chart at the end of every session — it takes under a minute, and it is the point of the whole exercise. Then, weekly (or any time you look over a shoulder), read each chart against three questions:

+ *Are corrects accelerating?* A rising dot-line means learning is happening. Change nothing.
+ *Are errors low or falling?* Errors above \~2/min that aren't falling deserve attention even when corrects rise — speed built on errors doesn't survive the next stage.
+ *Has the picture been flat for 3–4 sessions?* Flat means the current arrangement has stopped teaching. Change something. In rough order of what to try:

  - *Shrink the slice.* Drop from words back to the drill, or from the current stage's drill to an earlier one that contains the offending keys.
  - *Shorten the timing.* A student stuck at 30 s often accelerates again at 10 s — more sprints, more wins.
  - *Isolate from the diagnostics.* Target whatever most-missed / slowest keys have been naming all week.
  - *Check technique.* Flat charts are very often a looking-at-the-keyboard problem or a wrong-finger problem, not a practice-quantity problem.
  - *Check errors first.* If errors are high, slow the student's intent ("smooth and correct this sprint — the speed will come") for a few sprints; error rates usually drop within a session.
  - *Change the consequence.* A tiny stake — beat yesterday's dot and initial the chart corner — is often all the motivation change needed.

  Change *one* thing at a time, and let the chart tell you within a few days whether it worked. That is the entire experimental method of PT, run at the scale of one student.

#principle("flat charts indict the program, not the child")[
  When a chart flatlines, PT's founding rule applies: the learner is always right — the behavior is responding lawfully to the arrangement we provided. So we change the arrangement: slice, timing, stimulus, technique, consequence. "Try harder" is not on the list.
]

= The weekly benchmark and graduation

About once a week, every student runs the benchmark probe at 60 seconds and charts it on its own line. This line is the course's ground truth: stage pinpoints measure practiced components, but the benchmark measures unpracticed, real typing — capitals, punctuation, and every letter of the alphabet included. Expect it to lag the practiced pinpoints; that gap is normal and closes as components consolidate.

*Graduation criterion* (a starting hypothesis — tune it from your cohort's charts):

- *Rate:* ≥ 150 correct keystrokes/min (about 30 WPM) with ≤ 2 errors/min on the 60-second benchmark;
- *Stability:* met on three separate class days, not once;
- *Endurance:* the same rates held at least once on the 120-second benchmark.

When a student graduates, they don't stop typing — they move to the Extra pinpoints (common-word sentences, the literature passage) and to real work: everything they type for your class and others is now practice with a purpose.

= A ten-minute daily lesson

The whole routine fits in about ten minutes a day, and daily-short beats weekly-long by a wide margin:

#table(
  columns: (auto, 1fr),
  align: (left, left),
  table.header([*Minutes*], [*Activity*]),
  [1], [Settle: charts out, app open, hands to home position.],
  [2–3], [Current-stage drill: several short sprints (10–15 s), best one noted.],
  [2], [Targeted work: whatever yesterday's most-missed / slowest keys named, as isolated sprints.],
  [2–3], [Current-stage words (30 s), or the scheduled checkpoint / weekly benchmark.],
  [1–2], [Chart the day's numbers; student states their next move ("tomorrow I isolate `r u`").],
)

= Troubleshooting

*"They keep looking at the keyboard."* Cover the hands (paper, a cloth, a box lid). Expect rates to drop for a few days, then recover higher. Charts make this visible and therefore survivable — show the student the dip-and-recovery pattern on their own chart.

*"They're fast but sloppy."* Errors above 2/min and not falling: shift the student's intent to smooth-and-correct for a few sprints, and check fingering — sloppiness is often one wrong-fingered key, findable in the most-missed list.

*"They're accurate but frozen."* Very low errors with low, flat corrects usually means the student is being careful instead of fluent. Shorten the timing to 10 s and make it a game of beating their own dot; celebrate rate gains loudly and ignore the odd error.

*"They were fine last week and collapsed at the new stage."* Normal. New keys temporarily depress everything. If it hasn't recovered in 3–4 sessions, the previous stage wasn't actually fluent — drop back, re-reach the aim, return.

*"A checkpoint sagged while current work is fine."* That's the checkpoint doing its job: retention is slipping. Schedule the sagging material as the targeted-work slot for a few days.

*"One student is far behind the class."* PT is built for this: their chart, their slice, their timings. There is no class pace — there are twenty-five individual celerations. A student accelerating on Stage 4 while others sit at Stage 9 is succeeding.

*"Can they practice at home?"* Yes — the app is free, stores nothing, and runs in any browser. Send the URL home; extra sprints only help. The chart stays the official record either way.

#v(1em)
#line(length: 100%, stroke: 0.5pt + luma(180))
#text(size: 9pt, fill: luma(100))[
  This guide accompanies the revision-2 pinpoint set. Suggested aims and the graduation criterion also live as comments in `tests.js`; keep the two in sync if you tune them. The app records nothing by design — the paper Standard Celeration Chart is the database, and the student is its keeper.
]
