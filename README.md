# Loheswaran Weds Sangetaa

Digital wedding invitation (e-card). Theme: ivory, maroon and temple gold, with a beach mandap.
Static site (HTML/CSS/JS), no build step.

## Page flow

1. **Temple doors**: carved maroon doors with a mango-leaf thoranam and oil lamps. "Open Invitation" swings them open.
2. **Hero**: quote, couple names, countdown, and a garlanded mandap on the beach.
3. **A message for you**: tap the card to flip it and read the couple's note.
4. **Our Families**: the groom's and bride's parents.
5. **The Wedding**: dates, events, venue and directions.
6. **The Reception**: evening event, venue and directions. Set `reception: null` to hide it.
7. **Thank You**.

## Structure

```
index.html            page structure
css/style.css         design and colours (variables at the top)
js/config.js          ⭐ ALL TEXT & SETTINGS: edit this file
js/app.js             doors, countdown, message card, music, scroll reveal
assets/art/           illustrations (beach-mandap, thoranam, pillar, lotus, lamp)
assets/music/         background song (MP3)
```

## Editing

Open `js/config.js`. Items marked `[TBC]` are placeholders.

- **Countdown**: `countdownTo` in the format `2027-01-24T09:00:00+08:00`.
- **Events**: in `wedding.days` / `reception.days`. Icons: `family`, `ring`, `mandap`, `sparkle`, `food`.
  Set `highlight: true` to emphasise the main ceremony.
- **Music**: put the MP3 in `assets/music/` and set `music: "assets/music/song.mp3"`. The button hides when it's empty.

## Test locally

```
python3 -m http.server 8000
```
Open http://localhost:8000

## Deploy (Netlify)

New site → Import from Git → choose this repo. Leave the build command empty; the publish directory is `.`.

---
Designed by Emoly Creations
