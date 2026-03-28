# The Morning Brief

Your personalized daily industry intelligence — 7 sectors, 5 minutes.

---

## 🚀 Deploy to Vercel (Live in 2 Minutes)

### Step 1 — Push to GitHub
1. Go to [github.com/new](https://github.com/new) and create a new repo called `morning-brief`
2. Upload all these files (drag and drop the entire folder contents)
3. Click "Commit changes"

### Step 2 — Connect Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Select your `morning-brief` repo
4. Vercel auto-detects Vite — just click **"Deploy"**
5. In ~45 seconds you'll get a live URL like `morning-brief.vercel.app`

### Step 3 — Edit Live
Now whenever you change code in GitHub and push, Vercel auto-rebuilds in seconds.

**Edit directly on GitHub:** Open any file → click the pencil icon → edit → commit. Site updates in ~15 seconds.

**Edit locally (recommended for bigger changes):**
```bash
git clone https://github.com/YOUR_USERNAME/morning-brief.git
cd morning-brief
npm install
npm run dev        # Local preview at http://localhost:5173
# ... make your edits ...
git add . && git commit -m "update briefings" && git push
# Vercel auto-deploys ✓
```

---

## 📁 Project Structure

```
morning-brief/
├── index.html              ← Page shell (title, meta tags)
├── package.json            ← Dependencies
├── vite.config.js          ← Build config
└── src/
    ├── main.jsx            ← App entry point
    └── MorningBriefing.jsx ← ⭐ THE MAIN FILE — all content & UI lives here
```

**To update daily briefings:** Edit `src/MorningBriefing.jsx` → find the `BRIEFINGS` object → change headlines, summaries, tags, etc.

---

## 🎨 Custom Domain (Optional)
In Vercel dashboard → your project → Settings → Domains → add your domain (e.g. `themorningbrief.com`)

---

## 📝 License
Proprietary — The Morning Brief © 2026
