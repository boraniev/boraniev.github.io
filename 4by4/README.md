### Norwegian 4x4 Training Method

The **Norwegian 4x4 training method** is a high-intensity interval training (HIIT) protocol designed to boost **VO2 max** and overall cardiovascular fitness. It involves **four rounds of four-minute intervals** at **85–95% of your maximum heart rate**, each followed by **three minutes of active recovery**. Popular among athletes for its efficiency, this method maximizes aerobic capacity in a short, structured session.

---

### How to Get Started

Use this app to gradually build your endurance:

1. **Start with 1-minute running intervals.**
2. **After a few sessions, progress to 2 minutes.**
3. **Once comfortable, move to 3 minutes.**
4. **Finally, aim for the full 4-minute intervals.**

This step-by-step approach ensures steady improvement without overexertion.

Open [`index.html`](https://boraniev.github.io/4by4/index.html) in a modern browser (Chrome, Firefox, Edge, Safari).

Quick test with a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

- Features:
- Configurable run duration (`X`) via dropdown (1–4 minutes). Value persists in `localStorage`.
- Sequence: 5 min warmup → (run X + 3 min rest) × 4 → 5 min slow jog.
- Voice guidance using the Web Speech API (toggleable).
- Pause/resume and Stop controls, keyboard shortcuts (Space=start/pause, S=stop).
- Last 10 seconds audible countdown and phase transition announcements.

Notes & browser support:
- Speech requires `speechSynthesis` support; if unavailable, visual transcript is updated instead.
- For accessibility, dynamic updates use `aria-live` regions.

## Architecture

The detailed Mermaid diagram is in `architecture.mmd` — open that file or preview it with a Mermaid renderer.


