# Interval Trainer

Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari).

Quick test with a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Features:
- Configurable run duration (`X`) via slider (minutes). Value persists in `localStorage`.
- Sequence: 5 min warmup → (run X + 3 min rest) × 4 → 5 min slow jog.
- Voice guidance using the Web Speech API (toggleable).
- Pause/resume and Stop controls, keyboard shortcuts (Space=start/pause, S=stop).
- Last 10 seconds audible countdown and phase transition announcements.

Notes & browser support:
- Speech requires `speechSynthesis` support; if unavailable, visual transcript is updated instead.
- For accessibility, dynamic updates use `aria-live` regions.
- Consider running from a local server to avoid some browser restrictions on speech.

## Architecture

The project is a small client-side interval trainer. The main logic lives in `script.js` (an IIFE) which manages application state, timers, phase generation, UI updates and optional speech guidance. The UI is in `index.html` and styling in `styles.css`.

Below is the internal architecture diagram (Mermaid). Open `architecture.mmd` or paste the snippet into a Mermaid renderer / VS Code Mermaid preview to view.

```mermaid
flowchart LR
	subgraph UI[UI (index.html)]
		RunSlider["Run Slider\n(#runMinutes)"]
		StartBtn["Start Button\n(#startBtn)"]
		PauseBtn["Pause Button\n(#pauseBtn)"]
		StopBtn["Stop Button\n(#stopBtn)"]
		VoiceToggle["Voice Toggle\n(#voiceToggle)"]
		TranscriptEl["Transcript\n(#transcript)"]
		PhaseName["Phase Name\n(#phaseName)"]
		TimeLeft["Time Left\n(#timeLeft)"]
		ProgressBar["Progress Bar\n(#progressBar)"]
	end

	Script["IIFE: script.js"]
	Storage["localStorage\n(key: interval_trainer_run_minutes_v1)"]
	CSS["styles.css\n(progress transitions)"]

	UI -->|events| Script
	Script -->|reads/writes| Storage
	CSS --> ProgressBar

	subgraph Logic[script.js — Logic & State]
		State[("State:\nphases, current, remaining, running, expectedEnd, totalDuration, lastSpokenSecond")]
		BuildPhases["buildPhases(runMin)\n(generate phases array)"]
		StartTimer["startTimer()\n(initialize phases, expectedEnd, setInterval)"]
		PauseTimer["pauseTimer()\n(clearInterval, recalc remaining)"]
		StopTimer["stopTimer()\n(reset state, cancel speech)"]
		Tick["tick()\n(interval handler: update remaining)"]
		NextPhase["nextPhase()\n(advance current, set new remaining)"]
		UpdateUI["updateUI()\n(render phaseName, timeLeft, progressBar)"]
		Speak["speak(text, interrupt)\n(update transcript, optional speechSynthesis)"]
		SecondsFmt["secondsToMMSS(s)"]
	end

	%% Event wiring
	StartBtn -->|click| StartTimer
	PauseBtn -->|click| PauseTimer
	StopBtn -->|click| StopTimer
	RunSlider -->|input| BuildPhases

	%% Start flow
	StartTimer --> BuildPhases
	StartTimer --> State
	StartTimer -->|starts| Tick

	%% Tick behavior
	Tick -->|updates| State
	Tick -->|calls when <=10s| Speak
	Tick -->|when remaining<=0| NextPhase
	NextPhase --> State
	NextPhase -->|announces| Speak
	NextPhase --> UpdateUI

	%% UI updates
	UpdateUI --> PhaseName
	UpdateUI --> TimeLeft
	UpdateUI --> ProgressBar
	Speak --> TranscriptEl
	Speak -->|uses| VoiceToggle

	%% utilities
	BuildPhases --> State
	SecondsFmt --> UpdateUI

	style Script fill:#f8f9fa,stroke:#333,stroke-width:1px
	style Logic fill:#f1f5f9,stroke:#333,stroke-width:1px
	style UI fill:#eef2ff,stroke:#333,stroke-width:1px
	style Storage fill:#fff7ed,stroke:#333,stroke-width:1px
	style CSS fill:#ecfdf5,stroke:#333,stroke-width:1px
```
