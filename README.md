# Kritika — Premium Software Engineer Portfolio

Responsive portfolio website built with HTML, CSS, JavaScript and a Vercel serverless contact endpoint.

## Run locally
- Open `index.html` in a browser to preview the static front end.
- For API route testing and deployment, use Vercel CLI: `vercel dev`.

## Included
- Premium responsive portfolio UI with light/dark mode, scroll animations and mobile navigation. Typography has been enlarged throughout (body copy, labels, project cards, profile stats and mobile layouts) for clearer reading.
- Project filters and four dedicated project case-study pages.
- Live India time clock and keyboard command palette (Ctrl/⌘ + K).
- Live public GitHub profile, repository and recent public event data via GitHub REST API.
- Linked LeetCode (`kritika_3`) and GeeksforGeeks (`kritika_03`) profiles with best-effort live statistics and clearly labelled résumé fallbacks.
- Resume download, LinkedIn, GitHub and email links.
- SEO metadata, Open Graph tags, Person structured data, favicon, web manifest, robots.txt and sitemap.xml.
- Contact form backed by a Vercel serverless function and Resend email API.
- Basic security headers, input validation and honeypot field.

## Required configuration before production
### 1) Domain / SEO
No custom domain is configured yet. Deploy first and use the free Vercel-provided `your-project.vercel.app` address. Then add that exact URL as the canonical URL and sitemap entries; connect a purchased custom domain later if desired. The canonical URL is intentionally omitted until a real deployment URL exists.

### 2) Contact form email delivery
Create a Resend account and verify a sending domain. In Vercel Project → Settings → Environment Variables, add:
- `RESEND_API_KEY` = your Resend API key (secret; never put it in frontend files)
- `CONTACT_TO` = `kritika.bti@gmail.com`
- `CONTACT_FROM` = a verified sender, e.g. `Kritika Portfolio <hello@your-verified-domain.com>`
- `SITE_ORIGIN` = your deployed website origin, e.g. `https://your-site.vercel.app`

The form endpoint is `/api/contact`. Until these environment variables are configured, the form deliberately returns a setup message and the direct email link remains available.

### 3) LeetCode and GeeksforGeeks profiles
Configured profile links:
- LeetCode: https://leetcode.com/u/kritika_3/ (`kritika_3`)
- GeeksforGeeks: https://www.geeksforgeeks.org/profile/kritika_03 (`kritika_03`)

The portfolio attempts to load public LeetCode solved counts/difficulty breakdown/rank from LeetCode's undocumented public GraphQL query (direct request, then a GET-only CORS relay fallback). This endpoint is not an official supported API and may change or be rate-limited. GFG statistics are fetched from a community-maintained public stats service (`gfg-stats.tashif.codes`), not an official GFG API; its availability and schema are outside this project's control. Both integrations fail gracefully. If a live source is unavailable, the UI keeps the résumé snapshot values (LeetCode 175; GFG 318) and labels them as snapshots instead of claiming they are live. The profile links always point to the exact user accounts.

### 4) GitHub
The site loads public repository count, recent public events and up to six non-fork repositories from GitHub's public API for `kritika38`. GitHub may rate-limit unauthenticated requests; the page has a graceful fallback.

### 5) Portrait and project evidence
The résumé did not include a portrait or public repository/demo URLs for the four projects. The hero uses a designed monogram rather than a fabricated photo. Add real project links, screenshots, demos and verified impact metrics when available.

## Deploy to Vercel
1. Extract the ZIP.
2. Import the folder/repository into Vercel (Framework Preset: Other; build command empty; output directory `.`).
3. Add the Resend environment variables above.
4. Deploy.
5. After Vercel assigns the free `*.vercel.app` URL, add it to canonical metadata and `sitemap.xml`, then redeploy. A purchased domain is optional.

## Accuracy note
All education, experience, project and achievement claims are based on the supplied résumé. No fake performance metrics, employer claims, testimonials or project outcomes are added.
