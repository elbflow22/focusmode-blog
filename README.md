# Focus Mode One — Blog

Static site published at **blog.focusmode.one**. The compounding SEO/AEO asset for [Focus Mode One](https://focusmode.one) — articles built to be cited by AI engines (ChatGPT, Perplexity, Gemini, Claude) and ranked by Google.

Built per `FM1-blog-build-spec.md`. Astro 5, deployed to GitHub Pages, same hosting model as [`focusmode-legal`](../focusmode-legal/).

---

## Quick start

```bash
nvm use            # node 22 via .nvmrc
npm install
npm run dev        # local server, hot reload
npm run build      # produces ./dist
npm run preview    # serve ./dist
```

## Writing a new post

1. Add a Markdown or MDX file to `src/content/posts/`. Filename is the slug (`my-post.md` → `/posts/my-post/`).
2. Fill in the frontmatter. The schema in `src/content.config.ts` validates everything at build time — if anything's wrong the build fails with a clear error.
3. Run `npm run build` to confirm.

Required frontmatter:

| field | rule | what it's for |
| --- | --- | --- |
| `title` | 10–70 chars | SERP title |
| `description` | 120–180 chars | meta description |
| `pubDate` | ISO date | publish date |
| `updatedDate` | ISO date, optional | shown when present; bumps `dateModified` in JSON-LD |
| `canonicalURL` | URL, optional | override the default `/posts/<slug>/` |
| `targetQuery` | string | the one query this article targets (one topic per article) |
| `fm1Angle` | string ≥20 chars | how it reinforces FM1 positioning |
| `excerpt` | 40–280 chars | listing-page blurb |
| `quickAnswer` | 30–80 words | the AI-citation block; renders at the top |
| `faqs` | array of `{question, answer}`, optional | drives FAQ schema |
| `heroImage` | optional | hero image; becomes OG image |
| `related` | array of slugs, optional | renders as Related section |
| `draft` | boolean, default false | skips listing, RSS, sitemap, llms.txt |

See `src/content/posts/quarterly-planning-vs-todo-lists.md` for a working example.

## Structure

```
src/
├── content.config.ts           # frontmatter schema (Zod-validated)
├── content/posts/              # articles (.md / .mdx)
├── consts.ts                   # site/org/author identity
├── lib/
│   ├── jsonld.ts               # JSON-LD builders, validated at build
│   └── url.ts                  # canonical URL helpers
├── components/
│   ├── BaseHead.astro          # meta, OG, Twitter, canonical
│   ├── JsonLd.astro            # <script type="application/ld+json">
│   ├── QuickAnswer.astro       # the Section-3 citation block
│   ├── Faq.astro               # FAQ DOM (paired with FAQ JSON-LD)
│   └── …
├── layouts/
│   ├── BaseLayout.astro        # html shell, always-on Org/Person/WebSite
│   └── ArticleLayout.astro     # the post template — single source of truth
├── pages/
│   ├── index.astro             # listing
│   ├── posts/[...slug].astro   # article render
│   ├── rss.xml.js              # RSS feed
│   ├── llms.txt.ts             # auto-generated llms.txt
│   └── 404.astro
├── styles/global.css           # FM1 dark theme
public/
├── robots.txt                  # explicit AI-crawler allow-list
├── CNAME                       # blog.focusmode.one
├── favicon.svg
└── og/                         # OG images (drop fm1-logo.png + default.png here)
```

## What the article template enforces

Every post automatically gets:

- Article (BlogPosting) JSON-LD with canonical URL, dates, author, publisher, word count.
- FAQ JSON-LD if `faqs` is set. DOM and structured data come from the same array — they can't drift.
- Breadcrumb JSON-LD.
- Article-level OG and Twitter cards with `og:type=article`, `article:published_time`, `article:author`.
- A rendered Quick Answer block at the top.
- Site-wide Organization and Person (Pascal-as-founder) JSON-LD on every page — anchors the entity graph.

Build-time validation runs through Zod on every JSON-LD object. If a URL is malformed or a required field is empty, the build fails.

## Deployment

GitHub Pages, same as `focusmode-legal`:

1. Create a repo on GitHub (e.g. `focusmode-blog`) and push.
2. Repo Settings → Pages → Source: **GitHub Actions** (the workflow in `.github/workflows/deploy.yml` handles the rest).
3. DNS: `CNAME` record `blog` → `<github-user>.github.io`. The `CNAME` file is already in `public/`.
4. Enable HTTPS (automatic).
5. Submit `https://blog.focusmode.one/sitemap-index.xml` to Google Search Console.

## What's deliberately out of scope (v1)

- **Analytics.** Wire in privacy-respecting analytics (Plausible, Fathom, or self-hosted Umami) before the first article gets traffic. Add the snippet in `BaseHead.astro`.
- **Email capture.** Static-blog limitation; add later if a newsletter becomes a priority (§7 of the spec).
- **Real OG images.** Drop `fm1-logo.png` (the publisher logo for Organization JSON-LD) and `default.png` (1200×630, the OG fallback) into `public/og/`. Per-article hero images are picked up automatically from frontmatter.
- **`sameAs` URLs for Org and Author.** Fill these into `src/consts.ts` once the LinkedIn / X / App Store links exist — they meaningfully strengthen the entity graph.

## Maintenance

- **AI-crawler list in `robots.txt`** — review every few months; the bot landscape moves.
- **Brand drift** — palette and type stack mirror `focusmode-legal/assets/styles.css`. If one moves, move the other.
- **Spec drift** — `FM1-blog-build-spec.md` is the source of truth for *why* each piece is here. Re-read it before significant changes.
