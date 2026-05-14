# Sundarban Ristorante — Agent Instructions

Single-page restaurant site for **Sundarban Ristorante Indiano** (Bengali/Indian) at Via Mario Cartaro 45/47, Roma. Hosted on Netlify, auto-deployed from the GitHub repo.

## The golden rule

**Claude Design (`claude.ai/design`) is the source of truth for the design.** Do not hand-edit `index.html`, `styles.css`, or `app.jsx` to make visual changes. Direct the user back to Claude Design, then re-sync.

Exception: small, mechanical cleanups (dead imports, typos) are fine if they don't drift from the design's intent.

## Stack at a glance

- No build step. `index.html` loads React 18 + Framer Motion 11 via ESM importmap and Babel runtime-transpiles `app.jsx` in the browser.
- All styling in `styles.css` (includes ≤720px and ≤480px breakpoints).
- All copy/strings live in the `COPY` const at the top of `app.jsx` (IT + EN).
- Real photos in `assets/`. Two social icon sources are CDN: Simple Icons (`cdn.simpleicons.org`) for brand badges.
- Hours logic, language toggle, scroll-linked parallax, embers, marquee — all in `app.jsx`.

## Re-sync workflow

When the user iterates in Claude Design and shares a new bundle URL:

1. `WebFetch` the URL — Claude Design returns a gzip blob that gets saved by the harness.
2. Extract:
   ```sh
   mkdir -p /tmp/sundarban-design-vN && cd /tmp/sundarban-design-vN
   tar -xzf <path-from-webfetch-result>
   ```
3. Read `<bundle>/sundarban-ristorante/chats/chat1.md` to understand what changed.
4. Diff and overwrite:
   - `<bundle>/.../project/Sundarban.html` → `./index.html`
   - `<bundle>/.../project/styles.css`     → `./styles.css`
   - `<bundle>/.../project/app.jsx`        → `./app.jsx`
   - `<bundle>/.../project/assets/*`       → `./assets/`
5. **Re-apply the dead-import cleanup** in `app.jsx` if the new bundle reintroduces the unused Unsplash photos in the `PHOTOS` const (curry/tandoori — neither is rendered).
6. Local smoke test: `python3 -m http.server 8000`, open `localhost:8000`, confirm hero, photos, IT/EN toggle, map.
7. Commit (`git commit -m "Sync: Claude Design <YYYY-MM-DD>"`) and push. Netlify auto-deploys.

## Things to NOT touch

- `netlify.toml`, `.gitignore`, `README.md`, this file (`CLAUDE.md`) — they are not part of the design bundle.
- The renamed entry file: bundle ships `Sundarban.html`; we serve `index.html`. Always rename on re-sync.

## Hosting

- Netlify site connected to the GitHub repo. Publish dir = repo root. No build command.
- `assets/*` cached for 1 year. `index.html` + `app.jsx` are uncached so re-syncs land immediately.

## Contacts & links (kept in `app.jsx` `LINKS` const)

- JustEat: `https://www.justeat.it/restaurants-sundarban-ristorante-indiano-roma/menu`
- Glovo: `https://kaspi.glovoapp.com/hr/it/roma/stores/ristorante-sundarban-rom`
- Facebook: `https://www.facebook.com/p/Sundarban-Restaurant-100063619480846/`
- Phone: `+39 066 477 1702`
- Address: Via Mario Cartaro 45/47, 00176 Roma
