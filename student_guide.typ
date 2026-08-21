// student_guide.typ
// A student-facing guide to the typing course: only what a student needs to
// know to run their daily timings, chart their numbers, and move through the
// stages. The teacher-facing rationale lives in teacher_guide.typ.
// Compile with:  typst compile student_guide.typ

#set document(title: "Student Guide: Precision Teaching Typing", author: "Precision Teaching Typing Webapp")
#set page(
  paper: "us-letter",
  margin: (x: 0.75in, top: 0.8in, bottom: 0.6in),
  numbering: "1 / 1",
  header: context [
    #if here().page() > 1 [
      #align(right)[
        #text(size: 8pt, fill: luma(140))[Typing Student Guide]
      ]
      #v(-2pt)
      #line(length: 100%, stroke: 0.5pt + luma(210))
    ]
  ],
)
#set text(size: 10.5pt)
#set par(justify: false)

#let accent = rgb("#2563eb")
#let accent-deep = rgb("#1d4ed8")
#let accent-tint = rgb("#eaf1fd")
#let probe-tint = rgb("#fff3dc")
#let probe-ink = rgb("#8a5a00")
#let rule-gray = luma(205)

// Section headings, styled after the tracker's group bars.
#let section(title) = block(
  above: 1.3em,
  below: 0.7em,
  fill: accent-tint,
  inset: (x: 8pt, y: 5pt),
  radius: 2pt,
  width: 100%,
)[#text(weight: "bold", size: 11pt, fill: accent-deep)[#title]]

// Callout box, styled after the tracker's how-to box.
#let callout(title, body) = block(
  fill: luma(247),
  stroke: (left: 2.5pt + accent),
  inset: (x: 12pt, y: 8pt),
  radius: 2pt,
  width: 100%,
  above: 0.9em,
  below: 0.9em,
)[
  #text(weight: "bold", size: 9pt, tracking: 0.5pt, fill: accent-deep)[#upper(title)]
  #par(leading: 0.5em)[#text(size: 9.5pt)[#body]]
]

#let probe-badge = box(fill: probe-tint, outset: (x: 2pt, y: 1.5pt), radius: 2pt)[#text(size: 6.5pt, weight: "bold", fill: probe-ink)[PROBE]]

// ---- title block ----
#align(center)[
  #text(size: 21pt, weight: "bold", hyphenate: false)[Typing Student Guide]
  #v(3pt)
  #text(size: 11.5pt, fill: luma(90))[How to practice, chart, and level up — everything you need to run your own typing course]
]
#v(0.8em)

#section[What you're doing here]

You are learning to touch type: typing with the correct finger on every key, without looking at your hands. You'll get there with short, timed sprints — most last only 10 to 30 seconds — and by keeping score of your own progress on your own chart.

Two numbers matter after every sprint:

- *Correct per minute* — how many right keystrokes you made, per minute.
- *Incorrect per minute* — how many wrong ones.

Your job is to make the first number climb while the second stays low. Your chart shows whether that's happening, and *you* keep the chart, since tracking your own progress is the best way to stay engaged with the process.

#section[The rules of a timing]

+ *Pick your pinpoint and timing.* Your current stage's drill or words, at the timing you and your teacher have agreed on. Short sprints (10–15 s) are for building speed; 30 s and 60 s are for proving it.
+ *Hands to home position, eyes on the screen.* Then click start.
+ *Type what appears. Don't stop.* Keep going until time runs out.
+ *Backspace doesn't work on purpose.* If you hit a wrong key, it costs one error and that's all. Don't freeze, don't try to fix it, just type the next character. Stopping to fuss over a mistake costs far more than the mistake did.
+ *When time's up, read your results and write them down.*

Mistakes are fine. A sprint with a few errors and lots of correct keystrokes beats a slow, careful, "perfect" one. Speed and accuracy grow together when you keep moving.

#section[The five technique habits]

The app can count your keystrokes, but it can't see your hands. These five habits are what actually make you a touch typist. If you cheat on them and your speed will hit a ceiling later.

#table(
  columns: (auto, 1fr),
  align: (left, left),
  stroke: 0.6pt + rule-gray,
  inset: (x: 7pt, y: 5pt),
  table.header(
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Habit]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[What it looks like]],
  ),
  [*Home position*], [Fingers curved and resting on #raw("a s d f") and #raw("j k l ;"), thumbs on the space bar. Your index fingers find the bumps on #raw("f") and #raw("j") without looking. Every reach starts from home and returns to home.],
  [*Eyes on the screen*], [Don't look at the keyboard. This is the single biggest difference between touch typists and hunt-and-peck typists. Use the keyboard shields to cover the keyboard and look at the on-screen diagram if you forget where a key is],
  [*One finger, one key*], [Every key belongs to exactly one finger: no borrowing a "convenient" finger. Speed built on wrong fingers stops growing and is hard to fix later.],
  [*Opposite-hand shift*], [Capitals use the shift key on the *other* hand: right shift for #raw("A"), left shift for #raw("J"). This matters from Stage 16 on.],
  [*Relaxed rhythm*], [Wrists floating, strokes light and even. Don't strain for speed inside a sprint. Speed comes from relaxed, correct practice, day after day.],
)

#section[Reading your results screen]

When a sprint ends you'll see more than the two big numbers. Each part tells you something:

- *Correct/min and Incorrect/min* — these go on your chart. Next to them the app shows the *aim* for that pinpoint (for example "60+ correct/min, ≤2 err/min at 30s") so you know what you're working toward.
- *Most-missed keys* — the keys you got wrong most often. If the same key tops this list day after day, that key is tomorrow's target: run the drill stage that teaches it as extra short sprints.
- *Slowest keys* — the keys you hesitate on. A slow key is one you're still *searching* for instead of hitting by reflex. Treat it just like a missed key: isolate it with short drill sprints until the hesitation is gone. (This list is most trustworthy after longer timings.)
- *Your typed passage* — stays on screen. Spend fifteen seconds looking at *where* your errors bunched up. Errors clustered on one word or one reach mean something specific to fix; errors scattered randomly just mean you're at your current speed limit, and practice will raise it.

#section[Charting: your daily job]

At the end of every session, chart your best sprint for each pinpoint you practiced — it takes under a minute.

- A *dot* for correct/min. An *×* for incorrect/min.
- One column per calendar day. Each pinpoint gets its own line on the chart.
- Connect your dots from day to day. The slope of that line is your learning speed — a rising line means it's working.

The game is simple: *beat yesterday's dot.* Not the fastest kid in class — your own dot, from your own yesterday. If your dots are climbing and your ×'s are low or falling, you're winning, whatever anyone else's chart says.

#callout("stuck for a few days?")[
  If your dots have been flat for three or four sessions, that's not a "you" problem — it's a signal to change the practice. Talk to your teacher. Usually the fix is one of: drop back from words to the drill, shorten the timing (10-second sprints are great for getting unstuck), attack whatever your most-missed and slowest keys have been naming all week, or check your technique. Flat charts are very often an eyes-on-the-keyboard problem.
]

#section[Aims: how you level up]

Every pinpoint has an *aim* — the correct/min and errors/min that count as fluent — and a *certification timing*, the sprint length where meeting the aim actually counts:

#table(
  columns: (1fr, auto, auto, auto),
  align: (left, center, center, center),
  stroke: 0.6pt + rule-gray,
  inset: (x: 7pt, y: 5pt),
  table.header(
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Pinpoint type]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Correct/min aim]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Errors/min]],
    table.cell(fill: accent)[#text(fill: white, weight: "bold", size: 8.5pt)[Counts at]],
  ),
  [Letter drills], [40--60 by stage], [≤ 2], [30 s],
  [Word banks], [70+], [≤ 2], [30 s],
  table.cell(fill: probe-tint)[Checkpoints A--C #probe-badge], table.cell(fill: probe-tint)[70+], table.cell(fill: probe-tint)[≤ 2], table.cell(fill: probe-tint)[60 s],
  [Shift, punctuation, sentences], [90+], [≤ 2], [30 s],
  table.cell(fill: probe-tint)[Benchmark (graduation) #probe-badge], table.cell(fill: probe-tint)[150+], table.cell(fill: probe-tint)[≤ 2], table.cell(fill: probe-tint)[60 s],
)

#v(2pt)
Your exact aim is shown on the results screen for each pinpoint.

Why "counts at"? A ten-second burst isn't the same as real fluency; holding the pace is part of the skill. So sprint short to *build* speed, then prove it at the certification timing. You move to the next stage when you hit the aim at that timing *two days in a row*, with errors at 2/min or under. When you do, fill in the row on your *Achievement Tracker*: the date, your numbers, your initials. That page is your trophy case.

#section[Probes: the checkpoints and the benchmark]

Some pinpoints are marked #probe-badge on your Achievement Tracker. These are measuring sticks, not daily practice. Your teacher will schedule them occasionally, but you may absolutely use them to practice with.

- *Checkpoints A, B, C* come after the home row, after twenty keys, and after all 26 letters. They check that *everything so far* is still fluent, about once a week. If a checkpoint sags while your current stage is fine, that just means some older keys need a few review sprints — the checkpoint did its job by catching it.
- *The Benchmark* is a 60-second timing on real sentences with capitals and punctuation. You took it on day one, before you learned anything. That dot is your starting point, and every weekly benchmark after it shows your real, overall typing growing. Expect it to lag behind your practiced stages at first; the gap closes on its own.

#callout("the one rule everyone follows")[
  *Nobody ever practices on the benchmark.* It only measures your real typing if its sentences stay unfamiliar. Run it when it's scheduled — about once a week — and never in between. Practicing on it wouldn't make you a better typist; it would only break the measuring stick.
]

#section[Graduation — and what comes after]

You graduate from the course when your benchmark shows:

- *150+ correct/min with ≤ 2 errors/min* on the 60-second benchmark,
- on *three separate class days* — one great day isn't fluency,
- and the same rates held at least once on the *120-second* benchmark.

That's roughly 30 words per minute of real, eyes-on-the-screen typing. After that you move to the Extra pinpoints — full sentences and a literature passage — and, more importantly, everything you type for any class becomes practice.

#v(0.6em)
#line(length: 100%, stroke: 0.5pt + rule-gray)
#text(size: 8pt, fill: luma(120))[
  Keep this guide in your folder with your Standard Celeration Chart and your Achievement Tracker. Daily numbers go on the chart; met aims go on the tracker; questions go to your teacher.
]
