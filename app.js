// app.js
// Screen flow: select -> ready -> running -> results, looping back to
// either ready ("Try Again") or select ("Pick Another Test").
// No history is stored anywhere - results are shown once, for the student
// to copy onto their own paper chart, and then discarded.

(function () {
  const COUNTDOWN_STEPS = ["3", "2", "1", "GO"];
  const COUNTDOWN_STEP_MS = 700;
  const TIMER_TICK_MS = 100;

  const screens = {
    select: document.getElementById("screen-select"),
    ready: document.getElementById("screen-ready"),
    running: document.getElementById("screen-running"),
    results: document.getElementById("screen-results")
  };

  const testSelect = document.getElementById("testSelect");
  const testInstructions = document.getElementById("testInstructions");
  const assessmentNote = document.getElementById("assessmentNote");
  const durationButtons = document.getElementById("durationButtons");
  const startBtn = document.getElementById("startBtn");

  const countdownDisplay = document.getElementById("countdownDisplay");

  const timerPanel = document.getElementById("timerPanel");
  const timerDisplay = document.getElementById("timerDisplay");
  const typingArea = document.getElementById("typingArea");
  const stimulusDisplay = document.getElementById("stimulusDisplay");
  const hiddenInput = document.getElementById("hiddenInput");

  const reviewSection = document.getElementById("reviewSection");
  const resultPinpoint = document.getElementById("resultPinpoint");
  const resultTime = document.getElementById("resultTime");
  const resultCorrect = document.getElementById("resultCorrect");
  const resultIncorrect = document.getElementById("resultIncorrect");
  const resultCorrectPerMin = document.getElementById("resultCorrectPerMin");
  const resultIncorrectPerMin = document.getElementById("resultIncorrectPerMin");
  const resultAimLabel = document.getElementById("resultAimLabel");
  const resultAim = document.getElementById("resultAim");
  const sessionCompare = document.getElementById("sessionCompare");
  const sessionHistorySection = document.getElementById("sessionHistorySection");
  const sessionHistoryBody = document.getElementById("sessionHistoryBody");
  const errorList = document.getElementById("errorList");
  const slowKeyList = document.getElementById("slowKeyList");
  const tryAgainBtn = document.getElementById("tryAgainBtn");
  const pickAnotherBtn = document.getElementById("pickAnotherBtn");

  const diagramToggle = document.getElementById("diagramToggle");
  const diagramModeControls = document.getElementById("diagramModeControls");
  const diagramDisplay = document.getElementById("diagramDisplay");
  const diagramImg = document.getElementById("diagramImg");
  const diagramLegend = document.getElementById("diagramLegend");
  const diagramModeRadios = document.querySelectorAll('input[name="diagramMode"]');
  const DIAGRAM_SRC = {
    bw: "chromebook_keyboard_diagram.svg",
    color: "chromebook_keyboard_diagram_colors.svg"
  };

  // Whether a wrong keystroke gets colored red (see .char.incorrect in
  // style.css) as soon as it's typed. Correct keystrokes stay uncolored too
  // when this is off, so turning it off means no live feedback at all, not
  // just no red. This only controls *live* per-keystroke coloring while the
  // student is typing - the results screen always shows the full colored
  // review and the most-missed/slowest-keys breakdowns regardless (see
  // keystrokeResults and renderReview below).
  //
  // There used to be a "Show typing errors while typing" checkbox letting
  // students turn this off. Testing showed students always want it on, so
  // it's now hardcoded true and the checkbox is gone - but the wiring below
  // (and the assessment override) is left in place in case that changes.
  let showTypingErrors = true;

  // Live feedback is forced ON for assessment pinpoints (the benchmark and
  // the checkpoints) regardless of the student's own toggle, so every
  // administration of a probe is measured under the same condition - and so
  // an error doesn't go unnoticed and quietly cascade into a run of
  // consecutive errors. Real typing has feedback; a probe should too.
  function liveFeedbackEnabled() {
    return (currentTest && currentTest.assessment) || showTypingErrors;
  }

  // Session-only log of every run this page load, newest last. Never written
  // to storage - a page reload clears it, consistent with the app recording
  // nothing (see the file header). Everything derived for the results
  // screen (last/best comparison, the full session table) reads from this
  // one array rather than keeping separate aggregates in sync.
  const sessionRuns = [];

  function sameGroup(test, duration) {
    return sessionRuns.filter(r => r.test.id === test.id && r.duration === duration);
  }

  // Chromebooks get left open for days or weeks with the tab never
  // reloaded, so sessionRuns can't just rely on a reload to stay
  // same-day. Instead, each "PT day" runs 3am-to-3am rather than
  // midnight-to-midnight - a concession to anyone genuinely working late -
  // and any two timestamps are compared by which PT day they fall in.
  const DAY_RESET_HOUR = 3;
  function ptDayKey(date) {
    const shifted = new Date(date.getTime() - DAY_RESET_HOUR * 60 * 60 * 1000);
    return `${shifted.getFullYear()}-${shifted.getMonth()}-${shifted.getDate()}`;
  }

  // Clears sessionRuns if a 3am boundary has passed since the last recorded
  // run, so a tab left open overnight (or for weeks) doesn't mix today's
  // numbers with a stale day's. A no-op on the first run of a fresh tab.
  function resetSessionIfNewDay(now) {
    if (sessionRuns.length === 0) return;
    const lastRun = sessionRuns[sessionRuns.length - 1];
    if (ptDayKey(now) !== ptDayKey(lastRun.timestamp)) {
      sessionRuns.length = 0;
    }
  }

  // ---- per-run state ----
  let currentTest = null;
  let currentDuration = null;
  let stimulusGen = null;
  let scorer = null;
  let startTime = null;
  let renderedLength = 0;
  let timerIntervalId = null;
  let running = false;
  // Per-position correct/incorrect, recorded on every scored keystroke
  // regardless of the "Show typing errors" toggle, so the results screen can
  // always render the full colored review - not just when live feedback was
  // on during the run (see renderReview).
  let keystrokeResults = [];

  function setScreen(name) {
    Object.values(screens).forEach((el) => el.classList.add("hidden"));
    screens[name].classList.remove("hidden");
    // The timer panel lives outside the .screen sections (it's a sidebar,
    // not part of any one screen's markup), so it needs its own visibility
    // toggle in sync with screen changes instead of getting one for free.
    timerPanel.classList.toggle("hidden", name !== "running");
  }

  // ---- select screen ----

  // The benchmark probe is boldfaced in place (not moved to the top or
  // bottom of the list) so it's easy to find on a student's first visit
  // without being the first thing they're tempted to pick, and without
  // getting lost among the optional post-graduation stuff at the bottom.
  const BENCHMARK_TEST_ID = "v2-benchmark-probe";

  function populateTestSelect() {
    TESTS.forEach((test) => {
      const opt = document.createElement("option");
      opt.value = test.id;
      opt.textContent = test.name;
      if (test.id === BENCHMARK_TEST_ID) opt.className = "benchmark-option";
      testSelect.appendChild(opt);
    });
  }

  function getSelectedTest() {
    return TESTS.find((t) => t.id === testSelect.value) || null;
  }

  function renderDurationButtons(test) {
    durationButtons.innerHTML = "";
    currentDuration = null;

    if (!test) return;

    let defaultDuration = test.defaultDuration;
    if (!test.durations.includes(defaultDuration)) {
      console.warn(
        `Test "${test.id}" has defaultDuration ${defaultDuration} which is not in its durations list; falling back to ${test.durations[0]}.`
      );
      defaultDuration = test.durations[0];
    }

    test.durations.forEach((seconds) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = `${seconds}s`;
      btn.addEventListener("click", () => selectDuration(seconds));
      durationButtons.appendChild(btn);
    });

    selectDuration(defaultDuration);
  }

  function selectDuration(seconds) {
    currentDuration = seconds;
    Array.from(durationButtons.children).forEach((btn) => {
      btn.classList.toggle("selected", btn.textContent === `${seconds}s`);
    });
    updateStartEnabled();
  }

  function updateStartEnabled() {
    startBtn.disabled = !(currentTest && currentDuration);
  }

  function onTestSelected() {
    currentTest = getSelectedTest();
    testInstructions.textContent = currentTest && currentTest.instructions ? currentTest.instructions : "";

    const isAssessment = !!(currentTest && currentTest.assessment);
    assessmentNote.classList.toggle("hidden", !isAssessment);

    renderDurationButtons(currentTest);
    updateStartEnabled();
  }

  testSelect.addEventListener("change", onTestSelected);

  // Tests can point at an external .txt file via `source` instead of
  // writing `content` inline (see tests.js). Fetch and cache it onto the
  // test the first time it's needed; every other test already has
  // `content` set and resolves immediately.
  function loadTestContent(test) {
    if (test.content || !test.source) return Promise.resolve();
    if (test._loadPromise) return test._loadPromise;

    test._loadPromise = fetch(test.source)
      .then((response) => {
        if (!response.ok) throw new Error(`${test.source}: HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (test.type === "wordbank") {
          test.content = text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
        } else {
          test.content = text.replace(/\s+/g, " ").trim();
        }
      })
      .catch((err) => {
        test._loadPromise = null;
        throw err;
      });

    return test._loadPromise;
  }

  startBtn.addEventListener("click", () => {
    if (!currentTest) return;
    const label = startBtn.textContent;
    startBtn.disabled = true;
    startBtn.textContent = "Loading...";
    loadTestContent(currentTest)
      .then(() => {
        startBtn.textContent = label;
        updateStartEnabled();
        beginReady();
      })
      .catch((err) => {
        console.error(err);
        startBtn.textContent = label;
        updateStartEnabled();
        // Browsers block fetch() for file:// URLs entirely (it's not a
        // real network error) - this is the single most common cause of
        // this failure, so name it specifically instead of the generic
        // "check your connection" message.
        if (window.location.protocol === "file:") {
          alert(
            "Couldn't load this test's content because it's loaded from a " +
            "separate file, which browsers block when index.html is opened " +
            "directly. Run a local server instead - see \"Running it " +
            "locally\" in README.md - and open the page through that."
          );
        } else {
          alert("Couldn't load this test's content. Check your connection and try again.");
        }
      });
  });

  // ---- ready screen (countdown) ----

  function beginReady() {
    // Scrolls the page itself (not stimulusDisplay's own internal scroll,
    // reset separately in beginRunning/showResults) back to the top. Called
    // on both Start and Try Again, so a student who scrolled down to read
    // results or browse the picker doesn't have to scramble to find the
    // typing area before the countdown reaches GO.
    window.scrollTo(0, 0);
    setScreen("ready");
    let step = 0;
    countdownDisplay.textContent = COUNTDOWN_STEPS[step];
    const intervalId = setInterval(() => {
      step++;
      if (step >= COUNTDOWN_STEPS.length) {
        clearInterval(intervalId);
        beginRunning();
        return;
      }
      countdownDisplay.textContent = COUNTDOWN_STEPS[step];
    }, COUNTDOWN_STEP_MS);
  }

  // ---- running screen ----

  function beginRunning() {
    stimulusGen = createStimulusGenerator(currentTest, currentDuration);
    scorer = createScorer(stimulusGen);
    renderedLength = 0;
    keystrokeResults = [];
    // A previous run's results screen may have moved stimulusDisplay into
    // reviewSection (see showResults) - claim it back before typing starts.
    typingArea.appendChild(stimulusDisplay);
    stimulusDisplay.innerHTML = "";
    renderNewChars();

    hiddenInput.value = "";

    setScreen("running");
    // Must come after setScreen(), not before: while the running screen is
    // still hidden (display: none), stimulusDisplay has no CSS layout box,
    // so setting scrollTop is a silent no-op and the leftover scroll
    // position from the previous run survives.
    stimulusDisplay.scrollTop = 0;
    updateCursor(0);

    running = true;
    startTime = performance.now();
    updateTimerDisplay();
    timerIntervalId = setInterval(onTimerTick, TIMER_TICK_MS);

    hiddenInput.focus();
  }

  function renderNewChars() {
    const total = stimulusGen.length;
    if (total <= renderedLength) return;
    const frag = document.createDocumentFragment();
    const addition = stimulusGen.substring(renderedLength, total);
    for (let i = 0; i < addition.length; i++) {
      const span = document.createElement("span");
      span.textContent = addition[i];
      span.className = "char";
      frag.appendChild(span);
    }
    stimulusDisplay.appendChild(frag);
    renderedLength = total;
  }

  function updateCursor(position) {
    const prevCurrent = stimulusDisplay.querySelector(".char.current");
    if (prevCurrent) prevCurrent.classList.remove("current");
    const next = stimulusDisplay.children[position];
    if (next) {
      next.classList.add("current");
      scrollToKeepLookahead(next);
    }
  }

  // Keeps one full line visible below the current line, so the student can
  // look ahead while typing (a core touch-typing technique) instead of the
  // view only scrolling once the current line is the last one visible.
  // scrollIntoView({ block: "nearest" }) doesn't support this - it only
  // scrolls once the target itself goes out of view, which means the view
  // wouldn't scroll until the line *after* the current one is reached.
  function scrollToKeepLookahead(currentSpan) {
    const containerRect = stimulusDisplay.getBoundingClientRect();
    const spanRect = currentSpan.getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(stimulusDisplay).lineHeight);

    const spanTop = spanRect.top - containerRect.top + stimulusDisplay.scrollTop;
    const desiredVisibleBottom = spanTop + lineHeight * 2; // current line + one lookahead line
    const visibleBottom = stimulusDisplay.scrollTop + stimulusDisplay.clientHeight;

    if (desiredVisibleBottom > visibleBottom) {
      stimulusDisplay.scrollTop += desiredVisibleBottom - visibleBottom;
    }
  }

  function onKeydown(event) {
    if (!running) return;
    const prevPosition = scorer.position;
    const result = scorer.handleKeydown(event);
    if (!result) return;

    renderNewChars();
    keystrokeResults[prevPosition] = result.correct;

    const span = stimulusDisplay.children[prevPosition];
    if (span && liveFeedbackEnabled()) {
      // .char.correct/.char.incorrect (style.css) are compound selectors -
      // they need the "char" class to stay put, not get swapped out, or
      // neither rule ever matches.
      span.classList.add(result.correct ? "correct" : "incorrect");
    }

    updateCursor(scorer.position);
  }

  hiddenInput.addEventListener("keydown", onKeydown);
  hiddenInput.addEventListener("blur", () => {
    if (running) hiddenInput.focus();
  });

  function onTimerTick() {
    const elapsedMs = performance.now() - startTime;
    updateTimerDisplay(elapsedMs);
    if (elapsedMs >= currentDuration * 1000) {
      endRun();
    }
  }

  function updateTimerDisplay(elapsedMs) {
    const elapsedSeconds = elapsedMs ? elapsedMs / 1000 : 0;
    const remaining = Math.max(0, Math.ceil(currentDuration - elapsedSeconds));
    timerDisplay.textContent = `${remaining}s`;
  }

  function endRun() {
    running = false;
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    showResults();
  }

  // ---- results screen ----

  function showResults() {
    const minutes = currentDuration / 60;
    const correct = scorer.correctCount;
    const incorrect = scorer.incorrectCount;
    const correctPerMin = Math.round(correct / minutes);
    const incorrectPerMin = Math.round(incorrect / minutes);

    resultPinpoint.textContent = currentTest.name;
    resultTime.textContent = `${currentDuration}s`;
    resultCorrect.textContent = correct;
    resultIncorrect.textContent = incorrect;
    resultCorrectPerMin.textContent = correctPerMin;
    resultIncorrectPerMin.textContent = incorrectPerMin;

    const now = new Date();
    resetSessionIfNewDay(now);

    const runRecord = {
      timestamp: now,
      test: currentTest,
      duration: currentDuration,
      correct: correctPerMin,
      incorrect: incorrectPerMin
    };
    sessionRuns.push(runRecord);

    renderAim(currentTest, correctPerMin, incorrectPerMin);
    renderSessionCompare(runRecord);
    renderSessionHistory();
    renderErrorBreakdown();
    renderSlowKeyBreakdown();
    renderReview();
    setScreen("results");
    // Must come after setScreen(): stimulusDisplay has no CSS layout box
    // while screen-results is still hidden, so this would be a silent
    // no-op any earlier (same reasoning as the beginRunning() scroll reset).
    stimulusDisplay.scrollTop = 0;
  }

  // Shows the pinpoint's suggested aim (if it has one) next to the
  // student's own rate, including the certification timing (aimTiming in
  // tests.js) - the aim only counts as met at that timing or longer, so a
  // hot rate on a 10s sprint doesn't read as a certified stage. A reference
  // point only - no color-coded met/not-met indicator, since red/green is
  // already flagged as a colorblind-access problem elsewhere in this app
  // (see todo.md).
  function renderAim(test, correctPerMin, incorrectPerMin) {
    if (!test || !test.aim) {
      resultAimLabel.classList.add("hidden");
      resultAim.classList.add("hidden");
      return;
    }
    const timing = test.aimTiming ? ` at ${test.aimTiming}s` : "";
    resultAim.textContent = `${test.aim.correctPerMin}+ correct/min, ≤${test.aim.maxIncorrectPerMin} err/min${timing}`;
    resultAimLabel.classList.remove("hidden");
    resultAim.classList.remove("hidden");
  }

  // "Best" is a single run, not the best correct rate and the best incorrect
  // rate independently picked from whichever runs happened to produce them -
  // that would pair numbers that never occurred together and could show a
  // reckless-fast run's correct rate alongside a glacially-slow run's error
  // rate. If the pinpoint has an aim, a run that meets the max-incorrect aim
  // always outranks one that doesn't, regardless of correct rate; within the
  // same qualify/don't-qualify bucket (or when there's no aim to check
  // against), the higher correct rate wins, ties broken by lower incorrect.
  function isBetterRun(candidate, current, test) {
    const aim = test.aim;
    if (aim) {
      const candQualifies = candidate.incorrect <= aim.maxIncorrectPerMin;
      const currQualifies = current.incorrect <= aim.maxIncorrectPerMin;
      if (candQualifies !== currQualifies) return candQualifies;
    }
    if (candidate.correct !== current.correct) return candidate.correct > current.correct;
    return candidate.incorrect < current.incorrect;
  }

  // The runs-table "Best" badge (see renderSessionHistory) uses a fixed
  // certification bar instead of each pinpoint's own aim: >=60s timing and
  // <=2 errors/min. A sub-60s run can never carry the badge, no matter how
  // fast, because PT only certifies a rate held over a full minute. Among
  // 60s+ runs, one holding errors to <=2/min always outranks one that
  // doesn't; within the same qualify/don't bucket (or when none qualify)
  // the higher correct rate wins, ties broken by lower incorrect.
  const BEST_BADGE_MIN_DURATION = 60;
  const BEST_BADGE_MAX_INCORRECT = 2;

  function isBetterBestCandidate(candidate, current) {
    const candQualifies = candidate.incorrect <= BEST_BADGE_MAX_INCORRECT;
    const currQualifies = current.incorrect <= BEST_BADGE_MAX_INCORRECT;
    if (candQualifies !== currQualifies) return candQualifies;
    if (candidate.correct !== current.correct) return candidate.correct > current.correct;
    return candidate.incorrect < current.incorrect;
  }

  // One badge per pinpoint attempted this session (not one for the whole
  // table) - pinpoints differ in what correct rate is even attainable (a
  // single-key drill vs. a full-sentence wordbank), so there's no
  // PT-defensible way to compare correct rates across different pinpoints.
  function findBestRunsByPinpoint() {
    const bestByPinpoint = new Map();
    sessionRuns.forEach(r => {
      if (r.duration < BEST_BADGE_MIN_DURATION) return;
      const current = bestByPinpoint.get(r.test.id);
      if (!current || isBetterBestCandidate(r, current)) {
        bestByPinpoint.set(r.test.id, r);
      }
    });
    return new Set(bestByPinpoint.values());
  }

  // Shows this session's previous attempt and running best for this exact
  // pinpoint+duration. Hidden entirely on the first attempt of a
  // pinpoint+duration this session - there's nothing to compare against yet.
  function renderSessionCompare(runRecord) {
    const group = sameGroup(runRecord.test, runRecord.duration);
    const prevRuns = group.slice(0, -1); // exclude the run just completed
    if (prevRuns.length === 0) {
      sessionCompare.classList.add("hidden");
      return;
    }
    const prev = prevRuns[prevRuns.length - 1];
    const best = group.reduce((b, r) => (isBetterRun(r, b, runRecord.test) ? r : b));
    sessionCompare.textContent =
      `This session - last: ${prev.correct}/min correct, ${prev.incorrect}/min incorrect ` +
      `· best: ${best.correct}/min correct, ${best.incorrect}/min incorrect`;
    sessionCompare.classList.remove("hidden");
  }

  function formatRunTimestamp(date) {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" });
  }

  // Full log of this session's runs, most recent first, staying in plain
  // chronological order - the "Best" badge (see findBestRunsByPinpoint)
  // marks up to one row per pinpoint in place rather than reordering rows.
  function renderSessionHistory() {
    if (sessionRuns.length < 2) {
      sessionHistorySection.classList.add("hidden");
      return;
    }
    const bestRuns = findBestRunsByPinpoint();
    const rows = sessionRuns.slice().reverse();

    sessionHistoryBody.innerHTML = "";
    rows.forEach(r => {
      const tr = document.createElement("tr");
      const isBest = bestRuns.has(r);
      if (isBest) tr.classList.add("session-history-best");

      const timeCell = document.createElement("td");
      if (isBest) {
        const badge = document.createElement("span");
        badge.className = "best-badge";
        badge.textContent = "Best";
        timeCell.appendChild(badge);
      }
      timeCell.appendChild(document.createTextNode(formatRunTimestamp(r.timestamp)));
      tr.appendChild(timeCell);

      const pinpointCell = document.createElement("td");
      pinpointCell.className = "col-pinpoint";
      pinpointCell.textContent = r.test.name;
      tr.appendChild(pinpointCell);

      const timingCell = document.createElement("td");
      timingCell.textContent = `${r.duration}s`;
      tr.appendChild(timingCell);

      const correctCell = document.createElement("td");
      correctCell.className = "col-rate";
      correctCell.textContent = r.correct;
      tr.appendChild(correctCell);

      const incorrectCell = document.createElement("td");
      incorrectCell.className = "col-rate";
      incorrectCell.textContent = r.incorrect;
      tr.appendChild(incorrectCell);

      sessionHistoryBody.appendChild(tr);
    });
    sessionHistorySection.classList.remove("hidden");
  }

  // The colored review is always shown on the results screen, even if
  // "Show typing errors" was off during the run (see keystrokeResults) - the
  // spans may not have been colored live, so apply the coloring now from the
  // recorded per-keystroke results before revealing the section.
  function renderReview() {
    keystrokeResults.forEach((correct, position) => {
      const span = stimulusDisplay.children[position];
      if (span) span.classList.add(correct ? "correct" : "incorrect");
    });
    reviewSection.classList.remove("hidden");
    reviewSection.appendChild(stimulusDisplay);
  }

  function renderErrorBreakdown() {
    errorList.innerHTML = "";
    const breakdown = scorer.errorBreakdown(5);

    if (breakdown.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No errors - great job!";
      errorList.appendChild(li);
      return;
    }

    const maxCount = breakdown[0][1];
    const MAX_BAR_REM = 8;
    breakdown.forEach(([char, count]) => {
      const li = document.createElement("li");

      const keySpan = document.createElement("span");
      keySpan.className = "key";
      keySpan.textContent = char === " " ? "[space]" : char;

      const barSpan = document.createElement("span");
      barSpan.className = "bar";
      const widthRem = Math.max(0.5, (count / maxCount) * MAX_BAR_REM);
      barSpan.style.width = `${widthRem}rem`;

      const countSpan = document.createElement("span");
      countSpan.className = "count";
      countSpan.textContent = count;

      li.appendChild(keySpan);
      li.appendChild(barSpan);
      li.appendChild(countSpan);
      errorList.appendChild(li);
    });
  }

  function renderSlowKeyBreakdown() {
    slowKeyList.innerHTML = "";
    const breakdown = scorer.slowKeyBreakdown(5);

    if (breakdown.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No notably slow keys.";
      slowKeyList.appendChild(li);
      return;
    }

    const maxLatency = breakdown[0][1];
    const MAX_BAR_REM = 8;
    breakdown.forEach(([char, latencyMs]) => {
      const li = document.createElement("li");

      const keySpan = document.createElement("span");
      keySpan.className = "key";
      keySpan.textContent = char === " " ? "[space]" : char;

      const barSpan = document.createElement("span");
      barSpan.className = "bar slow-bar";
      const widthRem = Math.max(0.5, (latencyMs / maxLatency) * MAX_BAR_REM);
      barSpan.style.width = `${widthRem}rem`;

      const countSpan = document.createElement("span");
      countSpan.className = "count";
      countSpan.textContent = `${Math.round(latencyMs)} ms`;

      li.appendChild(keySpan);
      li.appendChild(barSpan);
      li.appendChild(countSpan);
      slowKeyList.appendChild(li);
    });
  }

  tryAgainBtn.addEventListener("click", () => beginReady());
  pickAnotherBtn.addEventListener("click", () => {
    // Same page-scroll reset as beginReady() (see its comment) - after a
    // long results screen this puts the pinpoint dropdown back in view
    // instead of leaving the student scrolled down past it.
    window.scrollTo(0, 0);
    setScreen("select");
  });

  // ---- keyboard diagram ----

  function getDiagramMode() {
    return document.querySelector('input[name="diagramMode"]:checked').value;
  }

  function updateDiagram() {
    const mode = getDiagramMode();
    diagramImg.src = DIAGRAM_SRC[mode];
    diagramLegend.classList.toggle("hidden", mode !== "color");
  }

  // Single source of truth for diagram visibility is diagramToggle.checked -
  // called on the change event and once at init, so the initial state (the
  // checkbox defaults to checked in index.html) doesn't have to be
  // duplicated as a separate hard-coded "hidden"/not-hidden state in the
  // markup for the controls/display it drives.
  function syncDiagramVisibility() {
    const show = diagramToggle.checked;
    diagramModeControls.classList.toggle("hidden", !show);
    diagramDisplay.classList.toggle("hidden", !show);
    if (show) updateDiagram();
  }

  diagramToggle.addEventListener("change", syncDiagramVisibility);

  diagramModeRadios.forEach((radio) => {
    radio.addEventListener("change", updateDiagram);
  });

  // ---- init ----

  function init() {
    if (!Array.isArray(TESTS) || TESTS.length === 0) {
      console.warn("TESTS is empty - add at least one test in tests.js.");
      return;
    }
    populateTestSelect();
    onTestSelected();
    syncDiagramVisibility();
    setScreen("select");
  }

  init();
})();
