# Time Systems Playground

This small site demonstrates several ways of representing time: Binary, Octal, Hexadecimal, Decimal, and Swatch Internet Time. Each page updates every second and uses a unified dark theme.

Files:
- `index.html` — main landing page with navigation (loads pages into an iframe).
- `home.html` — the landing content.
- `binary-clock.html` — detailed binary clock (separate file; already present).
- `octal-clock.html` — clock showing time in octal (base 8).
- `hexadecimal-clock.html` — clock showing time in hexadecimal (base 16).
- `decimal-clock.html` — normal decimal HH:MM:SS.
- `swatch-clock.html` — Swatch Internet Time (.beats).
- `time-explanation.html` — historical explanation for 24/60/60.
- `styles.css` — shared styling across pages.

Run locally:

```bash
cd /home/mars/prog/clocks
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Notes:
- All pages use plain HTML, CSS, and JavaScript. No external libraries.
- `binary-clock.html` contains its own inline styles to match the original requested look closely.
