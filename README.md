# Precision Teaching Typing Webapp
A webapp designed to give the teacher and the student control over what typing 
pinpoints are measured and timed.

The student picks a pinpoint, types against it for a fixed timing, and gets 
correct/min, incorrect/min, a most-missed-keys, and a slowest-keys breakdown to 
copy onto their own paper Standard Celeration Chart. In order to encourage 
students to track their own progress on Standard Celeration Charts, the app 
doesn't record anything.

This app is free. I'm not an expert in Precision Teaching or in touch-typing,
so there's no guarantee this is worth it. I made it to use in my own classes,
and if other people find it helpful, that's fantastic.

Oh, yes. One more thing. This app deliberately has as few options as possible.
The internet has too many options, and it's just distracting. I love MonkeyType, 
but I can never let students practice on it because they spend far more time 
ringing the bells and blowing the whistles than they do actually practicing their 
typing.

## Adding or editing a pinpoint

Edit `tests.js`. Each entry is a plain object — copy an existing one, give it
a unique `id`, and change the rest. No other file needs to change. See the
comments at the top of `tests.js` for the field reference.

N.b. I have no particular expertise in teaching typing, and I don't know whether
the pinpoints I have created here are the best. Not wanting to directly copy any
particular website, I asked an LLM to create a set of pinpoints based on a 
logical progression of typing with the preference of involving real words as 
soon as possible.

The whole point of making this open source is that you can yourself clone this
app and make your own pinpoints that you think are better. If you come up with
a really good set, let me know.

## Teacher's Guide

I got Claude Mythos to write me a guide, `teacher_guide.pdf` based on the 
principles of Precision Teaching. I'm going to use it this year (2026-2027) and 
hopefully I'll remember to record its effectiveness. You're welcome to use it
and/or provide helpful critiques.

## Running it locally

The easiest way to run this in its current form as is:

https://jbadgerw.github.io/precision_teaching_typing_webapp/

If you want to run it locally on your own machine, merely cloning the repo and
opening `index.html` in your browser won't work. Tests that load their content 
from a separate `.txt` file use `fetch()`, which browsers block entirely for 
`file://` pages. A local server or the hosted GitHub Pages site both work fine.

```
python3 -m http.server 8000
```

then open `http://localhost:8000/` in your browser's address bar.

