TODO
====

- [X] 1. Summary screen should continue to display the results of the typing. Right
now the typing disappears to show the summary, but I want to keep the results so
that students and teachers can review the results of their typing.

- [X] 2. Keyboard diagrams need to be adjusted. Chromebook keyboards have their 
symbols centered on the keys.

- [X] 3. Colors on the keyboard also need to be adjusted. Red and green are right
next to one another, which may be confusing for color blind students.

## Precision Teaching alignment (from PT review, 2026-08-19)

- [X] 4. Session-only last/best display per pinpoint on the results screen
(wiped on reload, nothing persisted) - lets students race their own last
sprint and best sprint within a session.

- [X] 5. Optional `aim` field in the test schema, shown on the results screen
next to the student's actual rate - moves aims out of tests.js comments and
into the student's view.

- [X] 6. ~~Per-test `assessment: true` flag that forces live error feedback
off for probes (benchmark + checkpoints)~~ - walked back. No-feedback probes
hide errors from the student mid-run, so a missed error can cascade into a
run of consecutive errors without the student noticing. Real typing has
feedback, and consistency across benchmark attempts matters more than
simulating a no-feedback condition - so the flag now forces live feedback
**on** for probes instead, uniformly, regardless of the student's toggle.

- [ ] 7. Record-floor handling for zero errors - display something like "0
errors (chart below 2/min)" instead of a bare 0, since a bare 0 isn't
plottable on a logarithmic Standard Celeration Chart.

- [X] 8. Add a 120s duration option to the checkpoint probes, for an
endurance dimension on the pinpoints that most deserve it.

- [ ] 9. (Cosmetic) Rename pinpoints into behavior language, e.g. "Types f
and j when shown" rather than "Stage 1: F and J" - matches how PT
traditionally states a pinpoint and teaches students what a pinpoint is.

- [ ] 10. I want the app to keep track of mistakes, even if they are not 
displayed while the user is typing and then display them at the Results screen,
even if the active feedback option is not checked.

- [X] 11. I need a nice table for recording student achievement at each level
so they can keep track of the whole course.

- [ ] 12. Research the colors for the diagram that will accord with the correct palette for accommodation of color blind people. When I made the current version grayscale, some of the bands were indistinguishable. Is that relevant? 