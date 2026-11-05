# Your own website

A simple website that you own: a clean link page (your photo, your name, a line about you and your links) that works the day you make it. The words live in your GitHub, the site runs free on your Cloudflare, and nobody can raise your rent.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/travishellstrom/own-your-own-starter)

## Start here (about 10 minutes)

Want to be walked through it, with a preview of your page as you type? Use **[travishellstrom.com/make-your-page](https://travishellstrom.com/make-your-page/)**. It walks you through the same steps.

1. **Make two free accounts** with your personal email (not a work or school one, so the site stays yours if you change jobs): [github.com](https://github.com/signup) and [cloudflare.com](https://dash.cloudflare.com/sign-up).
2. **Click the orange Deploy to Cloudflare button above.** Sign in to Cloudflare, press **New GitHub connection** and allow it, tick **Create private Git repository**, give your site a name (like `jane-smith`), and press Deploy. Two minutes later you have your own repository and a live address ending in `.workers.dev`.
3. **Make it yours, no code needed.** In your new repository on GitHub, open **EDIT-ME.txt**, press the pencil, change your name, your line and your links, and press **Commit changes**. Your page updates by itself about a minute later. To add your photo, upload a square picture named `photo.jpg` into the `public` folder.

That's it: you have a page of your own to put in your bio and your email signature.

**Someone helping you build it?** In your repository go to Settings → Collaborators → Add people and add their GitHub username. Everything still lives in your accounts, and you can remove them whenever you like.

## When you want more

Your page is plain files, so any tool or person can build on it: Claude, ChatGPT, a web designer. With Claude Pro, open Claude Code (claude.ai/code, or the Code tab in the app), connect GitHub, pick your repository and paste in the prompt from [FIRST-PROMPT.md](FIRST-PROMPT.md). From then on you just ask: "add a page about my book", "make it feel warmer".

When you want your own domain or want Google to find you, see [LAUNCH.md](LAUNCH.md).

## What it costs

- GitHub: free. Cloudflare hosting: free.
- Claude Pro (about $20 a month) only if you want to make changes by asking Claude. Without it you can still edit any page right on github.com (the pencil button), and it goes live the same way.
- Your own domain, if you want one: about $10 a year through Cloudflare.

## What's in here

- `EDIT-ME.txt` holds your name, line, links, color and photo.
- `public/` is the website as visitors see it (photos and other files go here).
- `src/page.html` is the page's design, and `build.js` fills it in from EDIT-ME.txt before each deploy.
- `CLAUDE.md` tells Claude how to work on this site.
- `share-card/` draws the picture people see when your link is texted or shared.
