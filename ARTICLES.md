# Focus Mode One Blog — Article Log

Lightweight tracker for the article funnel at blog.focusmode.one. Three states; move items between sections as they progress.

**States**

- **Ideas** — recommended posts not yet started. Pick from here when planning the next post.
- **Drafting / Editing** — in progress. File exists in `src/content/posts/` with `draft: true` until ready.
- **Published** — live. `draft: false` in frontmatter; appears in listing, RSS, sitemap, llms.txt.

**Workflow**

1. Pick an Idea. Move to Drafting.
2. Create the markdown file in `src/content/posts/<slug>.md`. Frontmatter must satisfy `src/content.config.ts` (build fails if not — that's the point).
3. When the draft reads right, set `draft: false`, push to main. GitHub Actions deploys.
4. Move the entry here from Drafting → Published.
5. Update `related: [...]` in 1–2 adjacent posts to point at the new slug. This is how the internal-link graph compounds.

**Cadence** — front-loaded for the foundation (5 posts in the first ~3 weeks), then **one every two weeks** as steady state. After the foundation, GSC data drives which idea moves to Drafting next.

---

## Published

| Title | Slug | Target query | Published |
| --- | --- | --- | --- |
| Quarterly Planning vs. To-Do Lists: Which Actually Moves the Needle? | `quarterly-planning-vs-todo-lists` | quarterly planning vs to-do list | 2026-05-14 |
| Quarter, Week, Day: Three Planning Horizons for Solo Operators | `three-planning-horizons-quarter-week-day` | quarterly weekly daily planning | 2026-05-16 |
| Why Your To-Do List Keeps Lying to You | `why-todo-lists-lie` | to do list not working | 2026-05-16 |
| Focus Future: How to Plan a Quarter in 10 Minutes | `how-to-plan-a-quarter-in-10-minutes` | quarterly planning template | 2026-05-16 |
| What Is a Focus Session, and Why a Timer App Isn't Enough | `what-is-a-focus-session` | focus session timer iPhone | 2026-05-16 |
| Productivity Apps vs Planning Apps: The Distinction That Matters | `productivity-apps-vs-planning-apps` | productivity app vs planning app | 2026-05-16 |

## Drafting / Editing

_None._

## Ideas

Grouped by priority tier. Each entry is a working title, the target search query, and a one-line angle.

### Tier 1 — Wizards (the landing's Rituals section sends traffic here)

- **The Weekly Launchpad: why Monday planning shouldn't start from a blank page**
  - Target: `weekly planning Monday ritual`
  - Hits the "Sunday planning is a chore" pain. Anti-blank-page angle.
- **The 2-minute daily ritual that replaces your to-do list**
  - Target: `daily planning routine`
  - Direct anti-to-do framing. Pairs with the published anti-to-do anchor.

### Tier 2 — Time-horizon explainers

- **Why your quarterly goals never reach your Monday**
  - Target: `quarterly goals not getting done`
  - Hits a specific frustration. Founder POV; links to Launchpad.
- **The bridge problem: why weekly planning fails most people**
  - Target: `weekly planning doesn't work`
  - Contrarian framing.

### Tier 3 — The Rule of Three

- **Why three is the right number for goals (and four breaks everything)**
  - Target: `how many goals should I set`
  - Constraint as feature. Defensible, opinionated, citable.
- **1-3-5 vs Rule of Three: which task system actually fits a day?**
  - Target: `1-3-5 method`
  - Targets an established term, positions FM1 as next iteration.

### Tier 4 — Specific features

- **Goal linking: connecting quarterly OKRs to daily tasks without spreadsheets**
  - Target: `connect daily tasks to quarterly goals`
  - The "no orphans" feature. OKR-curious audience.
- **The Weekly Promise Tracker: what consistency actually looks like over months**
  - Target: `track weekly goals consistency`
  - Visual-record feature. Strong founder-story tie-in.
- **Someday Shelf: a parking lot for ideas that doesn't become a graveyard**
  - Target: `someday maybe list`
  - Riffs on GTD's "someday/maybe". Opinionated take.
- **The Anchor: one sentence you should re-read every morning**
  - Target: `daily affirmation productivity`
  - Mindset feature. Broader self-help search audience.

### Tier 5 — Methodology / category creation

- **OKRs for one: doing quarterly planning without a team**
  - Target: `personal OKRs`
  - Refugees from corporate OKRs. FM1 = personal-scale answer.

### Tier 6 — Founder / story (different funnel)

- **I built an iOS app in a day with AI. Here's what actually shipped.**
  - Target: `build app with AI`
  - Founder credibility + builder-audience traffic. Different funnel.
- **From five apps to one: why I rebuilt my planning stack**
  - Target: `productivity app stack`
  - Pure founder narrative. Citation goldmine for ChatGPT/Perplexity.

---

## Notes

- Every published post has a **Get the app →** CTA at the end (wired in `src/layouts/ArticleLayout.astro`). Mirrors the rituals-section link from focusmode.one back to the blog.
- When you add a new post, update `related: [...]` in 1–2 existing posts to point at it. Builds the internal-link graph; signals topical authority to crawlers.
- `targetQuery` is the single SEO/AEO query each article is built to answer. Enforced one-topic-per-article by the frontmatter schema.
- Each post must satisfy the schema in `src/content.config.ts` at build time — `quickAnswer` is 30–80 words, `description` is 120–180 chars, etc. The build fails loudly if it doesn't fit, which is the point.
