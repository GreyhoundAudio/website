# greyhound audio — landing page

A single-page "coming soon" site: putty background (#E8E3D7), lowercase Inter
type, and a custom precision-dial cursor on desktop. Fully responsive down to
mobile, with the cursor automatically disabled on touch devices (phones/tablets
just get the normal system cursor — there's nothing to "fix" there, it's
intentional).

## Files

```
index.html   — the page
style.css    — all styling, palette, responsive rules, cursor styling
script.js    — cursor tracking logic
fonts/       — Inter (Light + Regular), self-hosted, no external font request
CNAME        — tells GitHub Pages to serve this on greyhoundaudio.com
```

## Deploy to GitHub Pages — step by step

**1. Create the repository**
- Go to github.com → New repository
- Name it anything (e.g. `greyhound-site`) — the name doesn't matter once a
  custom domain is attached
- Keep it **public** (GitHub Pages on a free plan requires this)
- Don't initialise with a README/gitignore — you're uploading existing files

**2. Upload these files**
Easiest path if you're not using git day-to-day:
- On the new repo's page, click **"uploading an existing file"**
- Drag in `index.html`, `style.css`, `script.js`, `CNAME`, and the whole
  `fonts` folder (GitHub will preserve the folder structure)
- Commit directly to the `main` branch

If you're comfortable with git instead:
```bash
cd greyhound-site
git init
git add .
git commit -m "landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

**3. Turn on GitHub Pages**
- In the repo, go to **Settings → Pages**
- Under "Build and deployment", set **Source** to `Deploy from a branch`
- Set **Branch** to `main` and folder to `/ (root)`
- Save

**4. Point your domain at it**
Since you're on Cloudflare for DNS, add these records in the Cloudflare
dashboard for `greyhoundaudio.com`:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | YOUR-USERNAME.github.io |

These four A records are GitHub Pages' fixed IP addresses — add all four.

**One Cloudflare-specific setting:** while GitHub Pages is issuing your SSL
certificate (next step), temporarily set the orange-cloud proxy icon next to
these records to **grey/DNS-only**. Once HTTPS is confirmed working in GitHub
(step 5), you can switch it back to proxied (orange cloud) if you want
Cloudflare's caching/protection — just note that GitHub's automatic SSL
provisioning can fail if Cloudflare is proxying traffic during setup.

**5. Confirm the custom domain in GitHub**
- Back in **Settings → Pages**, under "Custom domain", enter
  `greyhoundaudio.com` and save (this should auto-detect from your CNAME file,
  but confirm it explicitly)
- Wait for the DNS check to go green (can take a few minutes up to a few
  hours)
- Tick **"Enforce HTTPS"** once it becomes available — this may take up to 24
  hours after DNS propagates

**6. Done**
Visit `greyhoundaudio.com` — you should see the page live.

## Notes for future edits

- The wordmark and status text are the only content in `index.html` — edit
  the text inside `<h1 class="mark">` and `<p class="status">` directly.
- Colours live as CSS variables at the top of `style.css` under `:root` if
  you want to adjust the palette later.
- The cursor is capped to devices with a mouse/trackpad (`hover: hover` and
  `pointer: fine` media query) — this is deliberate, not a bug, since custom
  cursors don't mean anything on a touchscreen.
