# Faimly-T — Production Website

Brand-aligned static site (navy `#001890` + cyan `#00B9FF`, Poppins). **No build
step** — plain HTML, CSS, and vanilla JS. Drop-in ready for GitHub Pages,
Netlify, Vercel, or any static host.

## Files
```
site/
├── index.html        ← the page
├── style.css         ← all styling (design tokens baked in)
├── fonts.css         ← Poppins @font-face (local .ttf)
├── script.js         ← FAQ accordion, smooth scroll, contact form
└── assets/
    ├── logo-icon.png, logo-lockup.png, logo-lockup-white.png
    ├── case-architecture.jpg, case-onboarding.jpg
    └── fonts/Poppins-*.ttf
```
External (CDN): Font Awesome 6 icons + JetBrains Mono (Google Fonts). Everything
else is local.

## Before you publish — two things
1. **Contact form.** It currently runs in *demo mode* (shows the success panel
   without sending). To receive real submissions, get a free access key at
   **web3forms.com** and replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html`
   (one line). No backend needed. (Swap for Formspree/your own endpoint if you
   prefer — just change the form `action` and the key field.)
2. **Social links** (LinkedIn, YouTube) and legal links (Privacy, Terms) are
   placeholders (`#`) — point them at real URLs.

## Deploy
- **GitHub Pages:** copy the contents of `site/` to the repo root (or set Pages
  to serve `/site`), commit, push. Replaces the old `style.css` / `index.html`.
- **Netlify / Vercel:** drag the `site/` folder into the dashboard, or connect
  the repo and set the publish directory to `site`.

## What changed vs. the old live site
- Typeface switched to the official **Poppins**.
- Palette corrected to brand **navy + cyan** (was royal `#346DDB`).
- Real **brain-tree logomark** in nav, footer, and FAQ watermark.
- Cleaner accordion / smooth-scroll JS; SEO/OG meta added.
