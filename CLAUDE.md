# This website

A personal website. The owner edits it by asking Claude. They are not a programmer, so explain things in plain words and never leave them a task in a terminal.

## How it works
- It starts as a link page. `EDIT-ME.txt` holds the owner's name, line, email, theme, photo and links (`label | url` per line); the owner may edit it on github.com without code, so keep its format simple and its comments plain.
- `build.js` fills `src/page.html` from EDIT-ME.txt into `public/index.html` before every deploy (wrangler.jsonc `build`). `public/index.html` is generated and gitignored: never edit it, edit EDIT-ME.txt or src/page.html, and run `node build.js` to preview.
- Everything else in `public/` is served as is: photos, other pages (`public/<name>/index.html`).
- When the owner outgrows the link page, you may redesign src/page.html, or retire the build: remove the `build` line in wrangler.jsonc and the `public/index.html` line in .gitignore, commit a hand-written public/index.html, and move whatever EDIT-ME.txt held into it (then delete EDIT-ME.txt and build.js and say so in this file).
- Plain HTML and CSS, no framework. Keep it that way unless the owner asks for something only a framework can do.
- Every push to `main` goes live by itself: Cloudflare Workers Builds runs `npx wrangler deploy` and the site updates in about a minute. There is nothing else to run.

## Working with the owner
- Push straight to `main` when they ask for a change; only `main` goes live. If you made a branch, merge it into `main` and push. `git pull` before you start.
- After pushing, wait a minute, load the live page and check the change is there. Tell them the link.
- Check every change at phone width (about 390px) as well as on a computer. Most visitors are on phones.
- Files in `public/` are cached, so when you replace an image, change its `?v=` number everywhere it's linked.

## Rules for the words
- Never invent facts, quotes, reviews, awards, numbers or people. Use only what the owner tells you or what's already on the page. If a section needs a fact you don't have, ask.
- Copy you wrote for them (a headline, a line about them) is a draft: say so, and let them change it.
- Keep photos and names of children off unless the owner says they have permission.

## Hidden until launch
The site is hidden from search engines (the noindex tag in each page, `public/_headers` and `public/robots.txt`). Keep all three until the owner says to launch; then follow LAUNCH.md.

## Every page
Give each page a `<title>`, a one-sentence meta description, and `og:title`, `og:description` and `og:image`. When the home page's look or headline changes, redraw the share picture: `node share-card/render.js` (needs Playwright), then bump `?v=` on `og.jpg`.
