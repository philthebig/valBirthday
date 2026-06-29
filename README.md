# Chasse au Trésor — Tremblant 🏔️🎂

A playful birthday treasure hunt web app for exploring **Mont-Tremblant** POIs with clues, hints, confetti, and a final surprise reveal.

Built for **Val** — personalize everything in `src/config.ts` and `src/data/hunt.ts`.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) on your phone — you'll be walking around Tremblant!

## How it works

1. **Welcome screen** — birthday message and start button
2. **8 stops** — Village, Place Saint-Bernard, Lac Tremblant, Chocomotive, Casino, Cabriolet, La Diable, and the final treasure
3. At each stop, read the riddle, optionally get a hint or open Google Maps
4. Enter the place name (or keyword) when you arrive to unlock the next stop
5. **Confetti** celebrates each discovery; the final screen reveals your surprise message

Progress is saved in the browser (`localStorage`) so you can close the app and continue later.

## Personalize before the big day

### `src/config.ts`

| Field | What to change |
|-------|----------------|
| `recipientName` | Her name |
| `birthdayMessage` | Opening love note |
| `finalTreasure.title` / `.message` / `.surpriseHint` | Final reveal — dinner spot, gift, etc. |

### `src/data/hunt.ts`

Each stop has:

- `clue` — riddle to find the place
- `hint` — extra help (tap button in app)
- `answers` — accepted keywords (case-insensitive)
- `lat` / `lng` — for "Open in Maps"
- `celebration` / `funFact` — shown after completion

Reorder stops, change answers, or add your own secret rendezvous for the final stop.

## Deploy (share a link on her phone)

```bash
npm run build
```

Host the `dist/` folder on [Netlify](https://netlify.com), [Vercel](https://vercel.com), or GitHub Pages.

For GitHub Pages, set `base` in `vite.config.ts` to your repo name if needed.

## Tips for the day

- Test the route yourself once to confirm walking order
- Answers are flexible (`lac`, `Lac Tremblant`, `plage` all work for the lake stop)
- Use **Recommencer l'aventure** on the final screen to reset for a replay

Joyeux anniversaire! 💛
