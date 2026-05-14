// Tiny helpers for canonical URLs. Keep canonical-URL logic in one place so
// the template, Article JSON-LD, sitemap, and RSS all agree.

import { SITE } from '~/consts';

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return base + p;
}

export function postUrl(slug: string): string {
  return absoluteUrl(`/posts/${slug}/`);
}
