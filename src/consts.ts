// Single source of truth for site identity. Used by JSON-LD, meta tags,
// RSS, llms.txt. If you change a value here, every page rebuilds with it.

export const SITE = {
  url: 'https://blog.focusmode.one',
  title: 'Focus Mode One — Blog',
  description:
    'Articles on focused planning in quarters, weeks, and days — written by the founder of Focus Mode One.',
  language: 'en',
  locale: 'en_US',
} as const;

export const ORG = {
  name: 'Focus Mode One',
  legalName: 'Riverland International GmbH',
  url: 'https://focusmode.one',
  // Logo is referenced by Organization JSON-LD. Replace with a real raster
  // logo (Google requires PNG/JPG, recommended 112×112+, max 600×60 wide).
  logo: 'https://blog.focusmode.one/og/fm1-logo.png',
  // Fill these in as channels go live. Each entry strengthens the entity
  // graph — AI engines use sameAs to merge knowledge across sources.
  sameAs: [
    // 'https://apps.apple.com/app/focus-mode-one/...',
    // 'https://www.linkedin.com/company/focus-mode-one',
    // 'https://x.com/focusmodeone',
  ] as string[],
} as const;

export const AUTHOR = {
  name: 'Pascal Weihrauch',
  jobTitle: 'Founder, Focus Mode One',
  email: 'pascal@riverland-int.com',
  url: SITE.url + '/about/',
  // Same principle as ORG.sameAs — entity anchors for Pascal.
  sameAs: [
    // 'https://www.linkedin.com/in/pascal-weihrauch',
    // 'https://x.com/pweihrauch',
  ] as string[],
} as const;
