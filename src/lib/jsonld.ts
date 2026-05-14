// JSON-LD builders. Centralised so the structure is identical across every
// page that emits each schema type — the spec's "no per-post drift" rule.
//
// Build-time validation: each builder runs a minimal Zod schema before
// returning the object. If a required field is missing or malformed (e.g. an
// invalid URL), the build fails. Lighter than full schema.org validation but
// catches the failures that actually happen in practice — missing dates,
// bad URLs, empty strings.

import { z } from 'astro:content';
import { SITE, ORG, AUTHOR } from '~/consts';
import { absoluteUrl, postUrl } from '~/lib/url';

const urlSchema = z.string().url();
const nonEmpty = z.string().min(1);

// ---------- Organization ----------

const orgSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('Organization'),
  '@id': urlSchema,
  name: nonEmpty,
  legalName: nonEmpty,
  url: urlSchema,
  logo: urlSchema,
  founder: z.object({ '@id': urlSchema }),
  sameAs: z.array(urlSchema).optional(),
});

export function organizationJsonLd() {
  const obj = {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization' as const,
    '@id': ORG.url + '#organization',
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    founder: { '@id': SITE.url + '/about/#person' },
    ...(ORG.sameAs.length ? { sameAs: [...ORG.sameAs] } : {}),
  };
  return orgSchema.parse(obj);
}

// ---------- Person (author entity) ----------

const personSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('Person'),
  '@id': urlSchema,
  name: nonEmpty,
  jobTitle: nonEmpty,
  url: urlSchema,
  worksFor: z.object({ '@id': urlSchema }),
  sameAs: z.array(urlSchema).optional(),
});

export function personJsonLd() {
  const obj = {
    '@context': 'https://schema.org' as const,
    '@type': 'Person' as const,
    '@id': SITE.url + '/about/#person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: AUTHOR.url,
    worksFor: { '@id': ORG.url + '#organization' },
    ...(AUTHOR.sameAs.length ? { sameAs: [...AUTHOR.sameAs] } : {}),
  };
  return personSchema.parse(obj);
}

// ---------- BlogPosting (Article) ----------

const articleSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('BlogPosting'),
  '@id': urlSchema,
  mainEntityOfPage: urlSchema,
  headline: z.string().min(1).max(110),
  description: nonEmpty,
  image: z.array(urlSchema).optional(),
  datePublished: nonEmpty,
  dateModified: nonEmpty,
  author: z.object({ '@id': urlSchema }),
  publisher: z.object({ '@id': urlSchema }),
  url: urlSchema,
  inLanguage: nonEmpty,
  wordCount: z.number().int().positive().optional(),
  keywords: z.array(z.string()).optional(),
});

export type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  canonicalURL?: string;
  image?: string;
  targetQuery: string;
  wordCount?: number;
};

export function articleJsonLd(input: ArticleInput) {
  const url = input.canonicalURL || postUrl(input.slug);
  const obj = {
    '@context': 'https://schema.org' as const,
    '@type': 'BlogPosting' as const,
    '@id': url + '#article',
    mainEntityOfPage: url,
    headline: input.title,
    description: input.description,
    ...(input.image ? { image: [absoluteUrl(input.image)] } : {}),
    datePublished: input.pubDate.toISOString(),
    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),
    author: { '@id': SITE.url + '/about/#person' },
    publisher: { '@id': ORG.url + '#organization' },
    url,
    inLanguage: SITE.language,
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    keywords: [input.targetQuery],
  };
  return articleSchema.parse(obj);
}

// ---------- FAQPage ----------

const faqSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('FAQPage'),
  mainEntity: z
    .array(
      z.object({
        '@type': z.literal('Question'),
        name: nonEmpty,
        acceptedAnswer: z.object({
          '@type': z.literal('Answer'),
          text: nonEmpty,
        }),
      }),
    )
    .min(1),
});

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  const obj = {
    '@context': 'https://schema.org' as const,
    '@type': 'FAQPage' as const,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question' as const,
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: f.answer,
      },
    })),
  };
  return faqSchema.parse(obj);
}

// ---------- BreadcrumbList ----------

const breadcrumbSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('BreadcrumbList'),
  itemListElement: z
    .array(
      z.object({
        '@type': z.literal('ListItem'),
        position: z.number().int().positive(),
        name: nonEmpty,
        item: urlSchema,
      }),
    )
    .min(1),
});

export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  const obj = {
    '@context': 'https://schema.org' as const,
    '@type': 'BreadcrumbList' as const,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return breadcrumbSchema.parse(obj);
}

// ---------- WebSite (for homepage) ----------

const websiteSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('WebSite'),
  '@id': urlSchema,
  url: urlSchema,
  name: nonEmpty,
  description: nonEmpty,
  publisher: z.object({ '@id': urlSchema }),
  inLanguage: nonEmpty,
});

export function websiteJsonLd() {
  const obj = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebSite' as const,
    '@id': SITE.url + '#website',
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    publisher: { '@id': ORG.url + '#organization' },
    inLanguage: SITE.language,
  };
  return websiteSchema.parse(obj);
}
