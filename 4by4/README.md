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

## Architecture

The detailed Mermaid diagram is in `architecture.mmd` — open that file or preview it with a Mermaid renderer.


