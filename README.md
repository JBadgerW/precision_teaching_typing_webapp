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

## Running the app

The easiest way to run this in its current form as is:

https://jbadgerw.github.io/precision_teaching_typing_webapp/

### Running the Web App Locally

If you want to run the web app on your own computer, **merely cloning the repository 
and opening `index.html` in your browser will not work**.

Some of the tests load their content from separate `.txt` files using JavaScript's 
`fetch()` function. For security reasons, web browsers block `fetch()` requests from 
pages opened directly with the `file://` protocol.

Instead, you need to run a small **local web server** and then access the app through 
`http://localhost`.

#### Option 1: Linux

##### 1. Open a terminal

Open your terminal and navigate to the directory where you cloned the repository. For 
example:

```bash
cd ~/path/to/the/repository
```

##### 2. Start the local web server

If Python 3 is installed, run:

```bash
python3 -m http.server 8000
```

You should see something similar to:

```text
Serving HTTP on 0.0.0.0 port 8000 ...
```

##### 3. Open the app

Open your web browser and go to:

**http://localhost:8000/**

The web app should now load normally.

##### 4. Stop the server

When you are finished, return to the terminal and press:

```text
Ctrl+C
```

---

#### Option 2: Windows

Windows does not normally have a `python3` command available, but you can use Python 
if it is installed.

##### 1. Open Command Prompt or PowerShell

Navigate to the directory where you cloned the repository. For example:

```powershell
cd C:\Users\YourName\path\to\the\repository
```

##### 2. Start the local web server

Try:

```powershell
python -m http.server 8000
```

If that does not work, try:

```powershell
py -m http.server 8000
```

One of these commands should work if Python 3 is installed.

You should see something similar to:

```text
Serving HTTP on 0.0.0.0 port 8000 ...
```

##### 3. Open the app

Open your web browser and go to:

**http://localhost:8000/**

##### 4. Stop the server

When you are finished, return to the Command Prompt or PowerShell window and press:

```text
Ctrl+C
```

##### If Python is not installed

Install Python 3 first. During installation, make sure the option to **add Python to PATH** 
is selected.

After installing Python, close and reopen your Command Prompt or PowerShell window, then 
repeat the steps above.

---

#### Option 3: macOS

macOS can use Python 3 in essentially the same way as Linux.

##### 1. Open Terminal

Open the **Terminal** application and navigate to the directory where you cloned the repository:

```bash
cd /path/to/the/repository
```

##### 2. Start the local web server

Run:

```bash
python3 -m http.server 8000
```

You should see something similar to:

```text
Serving HTTP on 0.0.0.0 port 8000 ...
```

##### 3. Open the app

Open your web browser and go to:

**http://localhost:8000/**

##### 4. Stop the server

When you are finished, return to Terminal and press:

```text
Ctrl+C
```

##### If Python is not installed

Install Python 3 first. Once it is installed, open a new Terminal window and run:

```bash
python3 -m http.server 8000
```
