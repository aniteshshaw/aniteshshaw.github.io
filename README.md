# Anitesh Kumar Shaw — Portfolio

A zero-build static personal portfolio. Pure **HTML + CSS + vanilla JS** (no framework, no build
step). All content lives in **`data.js`** so it can be updated without touching the markup.

## Files

| File | What it is |
|------|------------|
| `index.html` | Page structure (semantic landmarks, section shells, lightbox modal). |
| `style.css` | Design system, themes (light/dark), animations, responsive layout. |
| `main.js` | Renders content from `data.js` and wires up all behavior. |
| `data.js` | **All editable content.** This is the only file you normally touch. |
| `assets/` | Résumé, certificate images, infographic. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (no Jekyll processing). |

## Run locally

```bash
cd Portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

(Any static server works — the site has no backend.)

## Deploy to GitHub Pages (root deploy)

1. Push this folder to a GitHub repository (files at the repo **root**).
2. Repo **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
5. Your site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

`.nojekyll` is already included so all files (including those starting with `_`) are served correctly.

## Editing content (`data.js`)

Open `data.js` — every section is labelled with a `HOW TO ADD …` comment. Common edits:

- **Add a certificate**: drop the image in `assets/certifications/`, then add one line to the
  `certifications` array (`{ filename, title, issuer, date }`).
- **Add an article / post / video**: add a block to the `writing` array with
  `type: 'linkedin' | 'medium' | 'youtube'` — the icon, color, and filter tab follow automatically.
- **Add a project / interest / achievement**: copy an existing block in the matching array.
  For a project, add real screenshots via `screenshots: { web: 'assets/projects/your-web.jpg', app: 'assets/projects/your-app.jpg' }`
  — `web` renders in a desktop browser frame, `app` in a phone frame. Omit either; with neither, a branded panel shows.
- **Update the book**: edit the `book` object (`title`, `blurb`, `themes`, optional `coverImage`).

### Add your headshot
Drop a square image at **`assets/headshot.jpg`** (the path is set in `data.js → about.headshot`).
It replaces the monogram placeholder automatically. No code change needed.

### Contact form
By default the form opens the visitor's email client (`mailto:`). To collect submissions instead,
create a free [Formspree](https://formspree.io) form and paste its endpoint into
`data.js → contact.formspreeEndpoint`.

## Accessibility

Built to **WCAG 2.1 AA**: skip-link, ARIA landmarks, keyboard-navigable nav and lightbox
(Esc/arrow keys, focus trap), visible focus rings, AA color contrast, and full
`prefers-reduced-motion` support (animations disable, content stays visible).

## Notes
- `Brady Lease.pdf` from the source assets is intentionally **not** published (personal document).
- The "Generative AI" certificate image on file is from **Databricks**; swap it in `data.js` if you
  have a different credential image to show.
