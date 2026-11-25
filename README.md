# Kritika — Premium Software Engineer Portfolio

Responsive portfolio website built with HTML, CSS, JavaScript and a Vercel serverless contact endpoint.

## Run locally
- Open `index.html` in a browser to preview the static front end.
- For API route testing and deployment, use Vercel CLI: `vercel dev`.

## Included
- Premium responsive portfolio UI with light/dark mode, scroll animations and mobile navigation. Typography has been enlarged throughout (body copy, labels, project cards, profile stats and mobile layouts) for clearer reading. Additional visual polish includes richer gradients, glass-like surfaces, rounded cards, stronger hover states, improved form fields and responsive contact layouts.
- Project filters and four dedicated project case-study pages.
- Live India time clock and keyboard command palette (Ctrl/⌘ + K).
- Live public GitHub profile, repository and recent public event data via GitHub REST API.
- Linked LeetCode (`kritika_3`) and GeeksforGeeks (`kritika_03`) profiles with best-effort live statistics and clearly labelled résumé fallbacks.
- A dedicated, high-visibility DSA and technical-learning section with separate Striver/takeUforward, HackerRank and CodeChef cards. CodeChef certificate links are kept separate; no unverified certificate URL is invented.
- Resume download, LinkedIn, GitHub and email links.
- SEO metadata, Open Graph tags, Person structured data, favicon, web manifest, robots.txt and sitemap.xml.
- Contact form backed by a Vercel serverless function and Resend email API when configured; always-visible direct email fallback with the visitor's message pre-filled if the endpoint is unavailable.
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

The form endpoint is `/api/contact`. If the Resend variables are missing, the endpoint returns a clear setup error and the form displays a direct email link with the visitor's name, reply address and message pre-filled. The visitor can review and send it from their email app. This fallback works even in a local static preview; automatic server-side delivery requires the Vercel environment variables above.

**Important:** the code is ready, but email delivery cannot be activated from the ZIP alone. The owner must create a Resend API key and add it as a Vercel environment variable. For an initial test, Resend's `onboarding@resend.dev` sender can be used only within Resend's test-mode recipient restrictions (normally the account owner's verified email). For public visitors and reliable production delivery, verify a domain in Resend and use a sender address on that domain.

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

## Contact form email delivery troubleshooting
The form sends through the Vercel serverless endpoint and Resend. For actual delivery, set these in **Vercel → Project → Settings → Environment Variables** and redeploy:

- `RESEND_API_KEY`: your private Resend API key (never put it in frontend code or share it in chat).
- `CONTACT_TO`: `kritika.bti@gmail.com`.
- `CONTACT_FROM`: a sender address on a domain verified in your Resend account, for example `Kritika Portfolio <hello@your-verified-domain.com>`.
- `SITE_ORIGIN`: the exact deployed site origin, e.g. `https://your-project.vercel.app`.

Then submit a test from the deployed website. Check the Resend email logs for the message status and check Gmail **Spam**, **Promotions**, and **All Mail**. A successful website response alone is not enough to confirm inbox placement. Resend's unverified/test sender restrictions can prevent delivery to arbitrary recipients. The direct email link is a fallback and opens the visitor's own mail app; it does not send automatically.


## Quick email setup (required once)
1. Create/sign in to Resend at `https://resend.com` using the mailbox where portfolio enquiries should arrive.
2. Create an API key in Resend. Copy it once; keep it private.
3. In Vercel, open the portfolio project → **Settings → Environment Variables**.
4. Add `RESEND_API_KEY` with the private key.
5. Add `CONTACT_TO` with `kritika.bti@gmail.com`.
6. For a quick owner-only test, set `CONTACT_FROM` to `Kritika Portfolio <onboarding@resend.dev>` if Resend allows that recipient in your account. For production, verify your own domain in Resend and set `CONTACT_FROM` to an address on that verified domain, for example `Kritika Portfolio <hello@yourdomain.com>`.
7. Add `SITE_ORIGIN` with the exact deployed website URL, for example `https://your-portfolio.vercel.app`.
8. Save the variables and **redeploy** the Vercel project. Environment variable changes do not affect an already-running deployment until redeployed.
9. Submit a test enquiry from the deployed portfolio. Check Resend → Logs, and in Gmail check Inbox, Spam, Promotions and All Mail.

Never paste the Resend API key into `config.js`, `script.js`, HTML, GitHub, or a public chat. The key belongs only in Vercel's server-side environment variables. A local `index.html` preview cannot send automatically because it does not run the Vercel `/api/contact` serverless function; use `vercel dev` or the deployed website for testing.


## Contact form email

The contact form uses Web3Forms directly from the browser. Its public Access Key is configured in `script.js`; Web3Forms delivers submissions to the email address verified when the form was created. No Vercel environment variables or Resend API key are required for this setup.
