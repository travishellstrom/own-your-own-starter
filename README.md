# Your own website

A simple website that you own: the words live in your GitHub, the site runs free on your Cloudflare, and you change it by asking Claude.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/travishellstrom/own-your-own-starter)

## Start here (about 15 minutes)

1. **Make two free accounts** with your personal email (not a work or school one, so the site stays yours if you change jobs): [github.com](https://github.com/signup) and [cloudflare.com](https://dash.cloudflare.com/sign-up).
2. **Click the orange Deploy to Cloudflare button above.** Sign in to Cloudflare, press **New GitHub connection** and allow it, tick **Create private Git repository**, give your site a name (like `jane-smith`), and press Deploy. Two minutes later you have your own repository and a live address ending in `.workers.dev`.
3. **Connect Claude to GitHub.** In Claude, open Claude Code (claude.ai/code, or the Code tab in the app) and connect GitHub when it asks. Pick your new repository.
4. **Paste the prompt in [FIRST-PROMPT.md](FIRST-PROMPT.md).** Claude interviews you and builds your first page from a site you like.

**Someone helping you build it?** In your new repository on GitHub, go to Settings → Collaborators → Add people and add their GitHub username. They can then build with you, and everything still lives in your accounts. Remove them whenever you like.

From then on, to change anything you just ask Claude ("add my new book", "make the photo bigger"). It saves the change to GitHub and Cloudflare puts it live in about a minute.

When you're happy and want your own domain or want Google to find you, see [LAUNCH.md](LAUNCH.md).

## What it costs

- GitHub: free. Cloudflare hosting: free. Claude: Pro is plenty for a site like this.
- Your own domain, if you want one: about $10 a year through Cloudflare.

## What's in here

- `public/` is the website exactly as visitors see it. `public/index.html` is the home page.
- `CLAUDE.md` tells Claude how to work on this site.
- `share-card/` draws the picture people see when your link is texted or shared.
