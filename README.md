# Anitesh Kumar Shaw — Portfolio

Fully static, pre-rendered personal portfolio. Plain **HTML + CSS + minimal vanilla JS** — no build
step, no client-side content injection. Every word of content lives in the served HTML source, so
search engines, LinkedIn/Twitter link previews, and recruiter scraping tools all see the real page.

## Structure

| Path | What it is |
|------|------------|
| `index.html` | Primary single-page site (hero, case studies, ventures, writing, credentials, about, contact). |
| `personal/index.html` | Fiction writing and creative work — kept separate from the professional brand, `noindex`. |
| `resume/index.html` | HTML mirror of the résumé PDF, for SEO. |
| `css/style.css` | Design system (navy/amber brand), layout, responsive rules. |
| `js/main.js` | Mobile nav toggle + footer year only — no content rendering. |
| `assets/` | Résumé PDF, headshot, project screenshots, OG image, favicon. |
| `robots.txt` / `sitemap.xml` | Crawler directives. |

## Run locally

```bash
python3 -m http.server 8420
# open http://localhost:8420
```

## Deploy to GitHub Pages (root deploy)

Repo **Settings → Pages** → Source = **Deploy from a branch** → branch `main`, folder `/ (root)`.
`.nojekyll` is included so all files are served as-is.

## Editing content

There's no data file — copy lives directly in the HTML. Edit the relevant `<section>` in
`index.html`, `personal/index.html`, or `resume/index.html` directly.

- **Certifications**: `.cred-row` in `index.html` / `resume/index.html` — one `.cred-tile` per cert
  (issuer name + cert name, no images/logos by design).
- **Case studies / Ventures / Writing**: each is a plain HTML block in `index.html` — copy an
  existing `<article>` and edit.
- **Résumé**: update both `assets/resume.pdf` (the real download) and `resume/index.html` (its HTML
  mirror) together so they stay in sync.
