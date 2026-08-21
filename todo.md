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

- [X] 10. I want the app to keep track of mistakes, even if they are not 
displayed while the user is typing and then display them at the Results screen,
even if the active feedback option is not checked.

- [X] 11. I need a nice table for recording student achievement at each level
so they can keep track of the whole course.

- [X] 12. According to ChatGPT, grayscale isn't actually a good simulation of 
colorblindness, so the diagram is probably good as is. ~Research the colors for 
the diagram that will accord with the correct palette for accommodation of color 
blind people. When I made the current version grayscale, some of the bands were 
indistinguishable. Is that relevant?~ 

- [ ] 13. Do I want to highlight the characters/min and errors/min? Those pieces
might be harder to find in the summary screen. It might make sense to either 
hide the raw values or else highlight the /min values. This will depend on how
the students use it. If they are able to find the values and use them without 
much trouble, then don't worry about it.

- [X] 14. Move the graduation test to the bottom of the list. That way it isn't 
something the students have to bypass every day, and it's less of a temptation for 
them. I can easily direct them to find it on day 1 to take it for benchmarking
purposes.

- [X] 15. After all that concern over colorblind access, my colors for correct
vs incorrect are green vs red. Does that make the screen difficult to read 
while a colorblind student is typing or while reviewing the typing for mistakes?
Perhaps this should be changed to blue vs red? Yes - switched to Okabe-Ito
blue (#0072b2) vs vermillion (#d55e00), same hex values already used in the
keyboard diagram's finger palette.

- [X] 16. Add pinpoints for numbers and the symbols which lie on the same keys
as the letters. Put these tests after the graduation test.

- [X] 17. Change the display diagram to True by default.

- [X] 18. The words for a and ; don't have any semi-colons. How can this be 
intelligently changed? Added a few "word; word" entries pairing two real
stage-4 words with a semicolon between them - not a full clause (only 7
letters exist yet), but the same word-then-; reach. Same fix applied to
stage 12 (comma-separated list: "come, call"), stage 14 (two short
fragments: "fix. mix" - real capitalized sentences arrive at Stage 18),
and stage 15 (and/or-style: "zoo/zero").

- [ ] 19. When the user starts (or restarts) a particular test, the app should
scroll to the top so the user can concentrate on typing. Right now, if I restart
a particular test, the countdown starts and I have to hurry up to scroll up to
the top so I can see what I need to be typing.
