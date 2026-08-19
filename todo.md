TODO
====

- [X] Summary screen should continue to display the results of the typing. Right
now the typing disappears to show the summary, but I want to keep the results so
that students and teachers can review the results of their typing.

- [ ] Keyboard diagrams need to be adjusted. Chromebook keyboards have their 
symbols centered on the keys.

- [ ] Colors on the keyboard also need to be adjusted. Red and green are right
next to one another, which may be confusing for color blind students.

## Precision Teaching alignment (from PT review, 2026-08-19)

- [ ] 1. Session-only last/best display per pinpoint on the results screen
(wiped on reload, nothing persisted) - lets students race their own last
sprint and best sprint within a session.

- [ ] 2. Optional `aim` field in the test schema, shown on the results screen
next to the student's actual rate - moves aims out of tests.js comments and
into the student's view.

- [ ] 3. Per-test `assessment: true` flag that forces live error feedback off
for probes (benchmark + checkpoints), so probe conditions are uniform by
construction instead of depending on the teacher policing the toggle.

- [ ] 4. Record-floor handling for zero errors - display something like "0
errors (chart below 2/min)" instead of a bare 0, since a bare 0 isn't
plottable on a logarithmic Standard Celeration Chart.

- [ ] 5. Hideable timer with an end-of-timing sound - the visible countdown
during a run invites clock-watching; make the sidebar clock opt-in.

- [ ] 6. Add a 120s duration option to the checkpoint probes, for an
endurance dimension on the pinpoints that most deserve it.

- [ ] 7. Copy-for-chart button on the results screen (clipboard only,
nothing stored) - reduces transcription errors when students copy their
numbers onto paper charts.

- [ ] 8. (Cosmetic) Rename pinpoints into behavior language, e.g. "Types f
and j when shown" rather than "Stage 1: F and J" - matches how PT
traditionally states a pinpoint and teaches students what a pinpoint is.


