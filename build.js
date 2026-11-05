// Builds public/index.html from EDIT-ME.txt and src/page.html.
// Cloudflare runs this before every deploy (wrangler.jsonc "build"), so editing
// EDIT-ME.txt on github.com is enough. Run `node build.js` to preview locally.
const fs = require('fs');
const path = require('path');

const root = __dirname;
const text = fs.readFileSync(path.join(root, 'EDIT-ME.txt'), 'utf8');
const site = { name: 'Your Name', line: '', email: '', theme: 'warm', photo: 'photo.jpg', credit: 'yes', links: [] };

for (const raw of text.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  if (line.includes('|')) {
    const [label, url] = line.split('|').map(s => s.trim());
    if (label && url) site.links.push({ label, url });
    continue;
  }
  const m = line.match(/^([a-z]+)\s*:\s*(.*)$/i);
  if (m) site[m[1].toLowerCase()] = m[2].trim();
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const safeUrl = u => (/^(https?:|mailto:|tel:|\/)/i.test(u) ? u : 'https://' + u);

const themes = {
  warm:   ['#faf7f2', '#1f1b16', '#6b6157', '#b5542a', '#ffffff'],
  night:  ['#14161c', '#f1efe9', '#a4a7b0', '#e8b44c', '#1d2029'],
  ocean:  ['#eef5f8', '#12303d', '#4e6b78', '#0f7a9a', '#ffffff'],
  forest: ['#f1f4ee', '#1e2a1f', '#5d6b5c', '#3d7a4a', '#ffffff'],
  rose:   ['#fbf3f3', '#2c1a1d', '#7a6064', '#b8475e', '#ffffff'],
};
const [bg, ink, sub, accent, card] = themes[site.theme] || themes.warm;

const hasPhoto = site.photo && fs.existsSync(path.join(root, 'public', site.photo));
const initials = site.name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
const avatar = hasPhoto
  ? `<img class="avatar" src="/${esc(site.photo)}?v=${fs.statSync(path.join(root, 'public', site.photo)).mtimeMs | 0}" alt="${esc(site.name)}" width="120" height="120">`
  : `<div class="avatar initials" aria-hidden="true">${esc(initials)}</div>`;

// A small icon for the services people link to most; anything else gets a plain arrow.
const ICONS = [
  [/instagram\.com/, '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>'],
  [/linkedin\.com/, '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'],
  [/youtube\.com|youtu\.be/, '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>'],
  [/(^|\.)x\.com|twitter\.com/, '<path d="M4 4l16 16M20 4L4 20"/>'],
  [/facebook\.com/, '<rect x="3" y="3" width="18" height="18" rx="9"/><path d="M13.5 8.5h2V6h-2a3 3 0 0 0-3 3v2H8.5v2.5h2V20h2.5v-6.5h2l.5-2.5H13V9.5a1 1 0 0 1 1-1z" fill="currentColor" stroke="none"/>'],
  [/tiktok\.com/, '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 4.5"/>'],
  [/substack\.com/, '<path d="M5 4h14M5 8h14M5 12h14v8l-7-4-7 4z"/>'],
  [/threads\.net|threads\.com/, '<path d="M16.5 11c-.5-3-3-4-5-3.5S8 10 8.5 12.5 12 16 14.5 14s1-6.5-1-6.5"/><circle cx="12" cy="12" r="9"/>'],
  [/github\.com/, '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-1-2.5c3 0 6-1.5 6-6a4.5 4.5 0 0 0-1.3-3.2 4 4 0 0 0-.1-3.3s-1.1-.3-3.6 1.3a12 12 0 0 0-6 0C6.5 2.2 5.4 2.5 5.4 2.5a4 4 0 0 0-.1 3.3A4.5 4.5 0 0 0 4 9c0 4.5 3 6 6 6a3 3 0 0 0-1 2.5V21"/>'],
  [/spotify\.com|podcasts\.apple\.com/, '<circle cx="12" cy="12" r="9"/><path d="M7.5 10c3-1 6.5-.7 9 .8M8 13.2c2.5-.7 5.2-.4 7.3.8M8.7 16.2c1.9-.5 3.9-.3 5.6.6"/>'],
  [/amazon\.|amzn\.to|bookshop\.org|goodreads\.com/, '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19"/>'],
];
const ARROW = '<path d="M7 17L17 7M9 7h8v8"/>';
const icon = url => {
  const hit = ICONS.find(([re]) => re.test(url));
  return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${hit ? hit[1] : ARROW}</svg>`;
};
const links = site.links.map(l =>
  `<li><a class="link" href="${esc(safeUrl(l.url))}" rel="noopener">${icon(l.url)}<span>${esc(l.label)}</span></a></li>`).join('\n      ');

// Any pictures in public/photos/ become a strip of photos (first six, in name order).
const photoDir = path.join(root, 'public', 'photos');
const pics = fs.existsSync(photoDir)
  ? fs.readdirSync(photoDir).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f)).sort().slice(0, 6) : [];
const photos = pics.length ? `<div class="photos n${pics.length}">${pics.map(f =>
  `<img src="/photos/${encodeURIComponent(f)}?v=${fs.statSync(path.join(photoDir, f)).mtimeMs | 0}" alt="" loading="lazy">`).join('')}</div>` : '';
const email = site.email && site.email !== 'you@example.com'
  ? `<a class="email" href="mailto:${esc(site.email)}">Email me</a>` : '';
const credit = /^y/i.test(site.credit)
  ? `<p class="credit"><a href="https://travishellstrom.com/own-your-own/">Own your own site</a></p>` : '';

const ogImage = hasPhoto ? `/${site.photo}` : '/og.jpg?v=1';

let page = fs.readFileSync(path.join(root, 'src', 'page.html'), 'utf8');
const fill = {
  NAME: esc(site.name), LINE: esc(site.line), OG_IMAGE: esc(ogImage),
  BG: bg, INK: ink, ACCENT_URL: accent.replace('#', '%23'), SUB: sub, ACCENT: accent, CARD: card,
  AVATAR: avatar, PHOTOS: photos, LINKS: links, EMAIL: email, CREDIT: credit,
};
page = page.replace(/\{\{([A-Z_]+)\}\}/g, (_, k) => (k in fill ? fill[k] : ''));
fs.writeFileSync(path.join(root, 'public', 'index.html'), page);
console.log(`Built public/index.html for ${site.name} with ${site.links.length} links.`);
