# Launch day

Ask Claude to do the repo steps for you; the Cloudflare steps are a few clicks.

## 1. Your own domain (optional, about $10 a year)
1. In Cloudflare: **Domain Registration → Register Domains**, search for your name, buy it.
2. Ask Claude: "Add my domain example.com to wrangler.jsonc as a custom domain, and www.example.com too, then push." That's this line in `wrangler.jsonc`:
   `"routes": [{ "pattern": "example.com", "custom_domain": true }, { "pattern": "www.example.com", "custom_domain": true }]`
3. On the next deploy Cloudflare points the domain at your site and sets up the security certificate by itself.

Already own a domain somewhere else (GoDaddy, Squarespace)? Add it to Cloudflare first (**Add a domain**, then change the nameservers where you bought it), or move it to Cloudflare Registrar.

## 2. Let search engines in
Ask Claude: "We're launching. Remove the noindex tag from every page, the X-Robots-Tag line from public/_headers, and change robots.txt to allow everything, add a sitemap.xml and a canonical link on each page, then push."

## 3. Tell people
Put the link in your email signature and your social profiles. When it's texted or shared, people see the share picture from `share-card/`.
