# Sundarban Ristorante — Website

Single-page site for **Sundarban Ristorante Indiano**, Via Mario Cartaro 45/47, 00176 Roma (Torpignattara).

- **Live:** _(set after first Netlify deploy)_
- **Hosting:** Netlify (auto-deploys on push to `main`)
- **Source of design:** Claude Design — re-export from the project URL and re-sync (see below)

## Stack

Flat static site. No build step.

- `index.html` — loads React 18 + Framer Motion 11 via ESM importmap, then Babel runtime-transpiles `app.jsx`
- `app.jsx` — full React app (IT/EN toggle, scroll animations, hours, map, contact)
- `styles.css` — all styling, including mobile breakpoints
- `assets/` — logo + dish photos (entrance, kacchi biryani, chicken chaap, bot bhuna)

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Re-sync from Claude Design

When the design changes upstream:

1. Get the new bundle URL from the user (looks like `https://api.anthropic.com/v1/design/h/<id>`).
2. Download the gzip, extract to `/tmp/sundarban-design-vN/`.
3. Overwrite from `<bundle>/sundarban-ristorante/project/`:
   - `Sundarban.html` → `index.html`
   - `styles.css` → `styles.css`
   - `app.jsx` → `app.jsx` (then re-apply the `PHOTOS` cleanup — drop unused Unsplash entries)
   - `assets/*` → `assets/*`
4. Commit and push. Netlify auto-deploys.

Detailed SOP for agents: `CLAUDE.md`.

## Deploy notes

- Netlify config: `netlify.toml` — publish dir is the repo root, no build command.
- `assets/*` is cached for 1 year (immutable). `index.html` and `app.jsx` are not cached, so design re-syncs go live immediately.
