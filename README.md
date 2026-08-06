# Just For Simran ❤️

A premium, romantic one-page website.

## Folder structure
```
simran-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── audio/        ← put your instrumental mp3 here
└── README.md
```

## To add background music
Drop any romantic instrumental `.mp3` file into `assets/audio/` and name it
`romantic-instrumental.mp3` (or update the `<source>` path in `index.html`).
The Play/Pause button in the top-right corner will control it automatically.
No file is included by default, so the button will simply do nothing until
you add one.

## To view
Open `index.html` in any modern browser — no build step, no frameworks,
no server required. For best results (especially the music), serve it
locally (e.g. `python3 -m http.server`) instead of double-clicking the file.

## Customize
- Colors, fonts, and spacing all live in `css/style.css` under the
  `:root` token block at the top.
- All copy lives directly in `index.html`.
- Animation timings and effect density (hearts/petals per second) are in
  `js/script.js`.
