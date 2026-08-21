// charting_advice_discussion.typ
// A record of a design discussion about how to chart student progress
// across ~40 pinpoints without overwhelming the daily routine.
// Compile with:  typst compile charting_advice_discussion.typ

#set document(title: "Charting Advice Discussion", author: "Precision Teaching Typing Webapp")
#set page(paper: "us-letter", margin: (x: 1in, y: 1in), numbering: "1")
#set text(size: 11pt)
#set par(justify: true)
#set heading(numbering: "1.1")
#show heading.where(level: 1): it => block(above: 1.6em, below: 0.8em)[#it]

// A callout box, matching the teacher's guide's PT-principle style.
#let principle(title, body) = block(
  fill: luma(245),
  stroke: (left: 2.5pt + luma(120)),
  inset: (x: 12pt, y: 10pt),
  radius: 2pt,
  width: 100%,
)[
  #text(weight: "bold", size: 10pt, tracking: 0.5pt)[#upper(title)] \
  #body
]

// The question, set off as a quoted block.
#let question(body) = block(
  fill: rgb("#eaf1fd"),
  stroke: (left: 2.5pt + rgb("#2563eb")),
  inset: (x: 12pt, y: 10pt),
  radius: 2pt,
  width: 100%,
)[
  #text(weight: "bold", size: 9pt, tracking: 0.5pt, fill: rgb("#1d4ed8"))[QUESTION] \
  #body
]

// Title block
#align(center)[
  #text(size: 20pt, weight: "bold", hyphenate: false)[Charting Advice: \ How Many Lines Does a Student Need?] \
  #v(4pt)
  #text(size: 12pt)[A design discussion on charting across ~40 pinpoints] \
  #v(2pt)
  #text(size: 9pt, fill: luma(100))[Recorded from a conversation with Claude about the Precision Teaching Typing Webapp]
]
#v(1.5em)

= The question

#question[
  I need some advice about charting. Each individual pinpoint at each individual timing requires its own set of dots. They just aren't comparable as measurements, it seems to me. But given that we have about 40 pinpoints with 5 timings for each, that's an insane number of separate pinpoints to chart. Furthermore, some pinpoints they might be on for a couple of days at the most, and charting progress on those before they graduate would be kind of pointless, right? In addition to this, progress means progress on a particular standard. Now we do have the graduation benchmark, which we've scheduled for once a week. And that should show progress. But that's not often enough to provide the student and teacher with the kind of moment-to-moment information they might need to make rational judgments about the student's progress. I was thinking that perhaps we would only chart the checkpoints (and the graduation benchmark, of course). The students would identify which checkpoint they were currently working on, and that would be run every single day as a check with the charting, and then their days work would involve identifying which pinpoint in that checkpoint-section they should spend most of their practice on. Comment on this from the perspective of Precision Teaching. Give any feedback needed, and recommend a rational strategy that answers my concerns while providing the best possible structure for students to succeed.
]

= The response

This is a really good set of questions, and the instincts behind it are half right — the diagnosis is correct but the proposed cure trades away the thing PT can't function without. The concerns are worth taking one at a time, then a structure follows.

== First, the multiplication problem is smaller than it looks

The "40 pinpoints × 5 timings = 200 series" framing has a misconception buried in it worth digging out. In PT, rate _is_ the universal currency — a per-minute count from a 15-second sprint and one from a 60-second sprint go on the same chart, on the same line. What differs between timings is the *record floor* (the lowest non-zero rate a timing can register: 1/duration), which is why short sprints can't certify low error rates — but the correct-rate dots are comparable. The intuition that they're not _perfectly_ comparable is also correct (endurance inflates short-sprint rates a bit), which is why the practical convention is simply: *pick one charting timing per pinpoint and hold it constant for that line.* The other timings are practice sprints — they never needed dots. The teacher guide already gestures at this ("chart one timing per pinpoint per day — the best one is fine"), but the sharper rule is: sprints are for learning, one designated timing per day is for the chart.

So the real number isn't 200 series. It's one line per pinpoint — and, more importantly, a student only has *two or three pinpoints alive at any moment*. The 40 lines never coexist; they're a few months of short segments spread across chart pages.

== Second, short lines are not pointless — they're the certification record

A pinpoint passed in two days produces two dots. That feels like a waste until the purpose of those two dots is made explicit: the move-on rule is "aim met at the certification timing, two consecutive days, errors ≤ 2." The two dots *are* that evidence. They're not there for trend-reading — celeration genuinely needs five-plus points to read — they're there as the certification record and as the self-recording ritual, which is itself an instructional event, not bookkeeping. A chart page full of short, steep, aim-hitting segments is exactly what a well-sliced curriculum looks like on paper. PTers call this "chart to aim, then start the next line on the same chart," and it's completely standard. Cost: one dot, ten seconds.

== Third, the checkpoint-as-daily-measure idea has a structural flaw

This is the point worth pushing back on hardest, on PT grounds. The foundational rule is *chart what you're teaching* — the daily dot must be sensitive to today's learning, or the practice → measure → decide loop breaks. The checkpoints can't do that job for most of the course, for a mechanical reason: they're milestone probes whose content matches a _completed_ section.

Walk through a student on Stage 7 (`r u`). Which checkpoint do they run daily? Checkpoint A contains no top-row keys at all — their `r u` learning is invisible on it; the line sits flat no matter how well the week goes, and the standard decision rules would read that flat line as "change something" when nothing is wrong. Checkpoint B contains `t y`, `w o`, `n b` — keys they haven't been taught — so the measure is polluted by errors on untaught material and depressed for reasons that have nothing to do with their practice. Either way, the daily dot stops answering the question "did today's practice work?" And notice the last third of the course has no checkpoint at all: Checkpoint C is letters-only, so Stages 16–18 (shift, punctuation, sentences) would go completely unmeasured except by the weekly benchmark.

There's a second-order cost too: "beat yesterday's dot" is the motivational engine, and it only fires when the dot is the thing the student actually practiced today. A checkpoint dot that won't move until the section ends teaches students that daily effort and the chart are disconnected — the precise lesson to avoid.

What the original proposal gets _right_ — and should absolutely be kept — is the section-level thinking: the student knows which section they're in, and each day they identify (from most-missed/slowest keys and the chart) which pinpoint in that section deserves the bulk of practice. That's exactly the self-management PT is after. The fix is only about where the dots go.

#principle("chart what you're teaching")[
  A daily measure must be sensitive to today's practice or the practice → measure → decide loop breaks. Checkpoints and the benchmark measure retention and generalization on a schedule; they cannot substitute for a measure of the pinpoint currently being taught, because for most of the course they either can't see that material yet or have already moved past it.
]

== The structure

Three lines, three functions, and the concurrent charting load never exceeds two dots on a normal day:

#table(
  columns: (auto, auto, auto, auto),
  align: (left, left, center, left),
  table.header([*Line*], [*What*], [*How often*], [*Function*]),
  [Working line], [The current pinpoint (usually the stage's words bank; the drill itself in Stages 1–3), best rate of the day at one fixed timing], [Daily], [Sensitive daily measure; drives "beat yesterday's dot" and the change-something rules],
  [Retention line], [The most recently passed checkpoint], [1–2× per week (daily only in the window right after a section completes, until certified)], [Catches slippage on cumulative material; the legitimate home of the checkpoint instinct],
  [Standard line], [The benchmark], [Weekly, never practiced], [Progress against the graduation standard],
)

Rules that make it cheap:

+ *One charting timing per pinpoint, fixed.* All other timings are uncharted sprints. This alone dissolves the ×5 problem.
+ *One dot per pinpoint per day, best sprint of the day.* Two dots on most days (working line + occasionally retention), three on benchmark day.
+ *Short lines end when the Achievement Tracker row gets filled in.* The tracker is the durable certification ledger; the chart segment is the evidence trail behind it. They're doing different jobs — the chart doesn't also need to be the archive.
+ *Isolated diagnostic sprints (yesterday's missed keys, etc.) are never charted.* They're treatment, not measurement.

On the "progress means progress on a standard" point: in PT the standard isn't only the benchmark — *every pinpoint's aim is a standard*, and celeration toward that aim is the moment-to-moment progress information otherwise missing between benchmarks. That's the whole reason the aims exist. The benchmark answers "is this becoming real typing?"; the working line answers "is this week's practice working?"; the retention line answers "is anything leaking?" A single line can't answer all three questions.

If after a term the two-dots-a-day routine still feels heavy for the youngest students, the defensible minimum is the working line plus weekly benchmark, with checkpoints recorded on the tracker only — but the three-line structure is the recommended starting point, because the retention line is the one that catches problems while they're still cheap.
