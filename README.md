# ⚡ AM SCRAPER // BRUTAL EDITION

> Neo-Brutalism UI for AM Scraper — Full client-side, zero backend required.

![Brutalism](https://img.shields.io/badge/STYLE-Brutalism-ff0055?style=for-the-badge)
![Deploy](https://img.shields.io/badge/DEPLOY-Vercel%20%7C%20GitHub%20Pages-00ff41?style=for-the-badge)
![Version](https://img.shields.io/badge/VERSION-2.0-00d4ff?style=for-the-badge)

---

## 🎨 Design Philosophy

**Neo-Brutalism + Code Brutalism** — Bold, raw, unapologetic.

- Thick 3px borders with hard black shadows
- Monospace typography (JetBrains Mono)
- Neon accent colors (#00ff41, #ff0055, #00d4ff)
- CRT scanline & noise overlay
- Glitch text effects
- Terminal-style logging

---

## 🚀 Quick Deploy

### Option A: GitHub Pages (Free)

```bash
# 1. Fork / clone this repo
git clone https://github.com/YOUR_USERNAME/am-scraper-brutal.git

# 2. Go to Settings > Pages
# 3. Source: Deploy from a branch → main → / (root)
# 4. Your site will be live at:
#    https://YOUR_USERNAME.github.io/am-scraper-brutal/
```

### Option B: Vercel (Recommended)

```bash
# 1. Fork this repo to your GitHub
# 2. Go to https://vercel.com/new
# 3. Import your forked repo
# 4. Framework Preset: Other
# 5. Deploy!
```

Or use Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

---

## 📁 Project Structure

```
am-scraper-brutal/
├── index.html          # Main HTML entry point
├── assets/
│   ├── style.css       # Brutalist styles
│   └── app.js          # Core scraper logic
├── vercel.json         # Vercel deployment config
├── LICENSE             # MIT License
└── README.md           # This file
```

---

## ⚙️ How It Works

| Step | Action | API Endpoint |
|------|--------|-------------|
| 1 | Enter target email | — |
| 2 | Initialize session | `GET /api/cookie` |
| 3 | Send verification link | `POST /api/send` |
| 4 | Paste magic link from inbox | — |
| 5 | Verify & extract user data | `POST /api/verify` |

All API calls are made **directly from the browser** using `fetch()`.

---

## ⚠️ CORS Notice

The target API (`am.yappi.my.id`) must allow cross-origin requests (CORS) for this to work in the browser. If CORS is blocked, you have two options:

1. **Use a CORS proxy** (add `https://cors-anywhere.herokuapp.com/` prefix)
2. **Deploy a simple Edge Function** (see `api/` folder if needed)

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, grid
- **Vanilla JS** — No frameworks, no build step
- **Google Fonts** — JetBrains Mono + Space Mono

---

## 📜 License

MIT License — do whatever you want. Just don't be a dick.

---

<p align="center">
  <sub>AM SCRAPER // BRUTAL EDITION // 2026</sub>
</p>
