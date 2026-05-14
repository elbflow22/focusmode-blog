// Content collection schema. This is the contract every article must satisfy.
// Astro runs this at build time — if a post's frontmatter doesn't match, the
// build fails with a precise error. That's the whole point: catch a missing
// meta description before the page indexes, not after.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      // SEO: titles longer than ~60 chars get truncated in Google's SERP.
      title: z.string().min(10).max(70),

      // Meta description sweet spot. Below 120 Google rewrites it; above 180
      // it truncates. Enforce the band rather than relying on writer discipline.
      description: z.string().min(120).max(180),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      // Optional override. If unset, layouts compute SITE.url + /posts/<slug>/.
      canonicalURL: z.string().url().optional(),

      // The single query this article targets. Forces one-topic-per-article
      // discipline (§3 of the spec). Surfaced in admin output to spot dupes.
      targetQuery: z.string().min(2),

      // How this article reinforces FM1 positioning (quarterly planning,
      // anti-to-do-list, founder story). Writers should be able to articulate
      // this in one sentence or the article isn't ready.
      fm1Angle: z.string().min(20),

      // Listing-page blurb. Distinct from `description` — that's for SEO/meta,
      // this is for human readers scanning the index.
      excerpt: z.string().min(40).max(280),

      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),

      // The Quick Answer block — Section 3's highest-leverage element.
      // Validated for length so an underweight or overweight one can't ship.
      // Target 40–60 words; we allow 30–80 for editorial flexibility.
      quickAnswer: z
        .string()
        .refine(
          (v) => {
            const words = v.trim().split(/\s+/).filter(Boolean).length;
            return words >= 30 && words <= 80;
          },
          { message: 'quickAnswer must be 30–80 words (target: 40–60).' },
        ),

      // FAQ block — drives FAQ JSON-LD. Optional but every article SHOULD
      // have at least 2–3 entries. Not enforced as required so a fast-written
      // post isn't blocked, but the template surfaces a warning when absent.
      faqs: z
        .array(
          z.object({
            question: z.string().min(8),
            answer: z.string().min(40),
          }),
        )
        .optional(),

      // For internal-link nudging. Slugs of related posts; surfaced in the
      // article template as "Related" links. Builds topical authority (§3).
      related: z.array(z.string()).optional(),

      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
