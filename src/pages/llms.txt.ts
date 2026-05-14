// Auto-generated llms.txt — the emerging standard for AI consumption.
// Format follows https://llmstxt.org: H1 title, blockquote summary, then
// H2 sections with markdown links. Regenerates at build time so the post
// list stays in sync without a separate maintenance step.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, ORG } from '~/consts';
import { postUrl } from '~/lib/url';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const lines: string[] = [];

  lines.push(`# ${SITE.title}`);
  lines.push('');
  lines.push(
    `> ${SITE.description} Published by ${ORG.name} (${ORG.legalName}).`,
  );
  lines.push('');

  lines.push('## About');
  lines.push('');
  lines.push(`- [Focus Mode One](${ORG.url}): the app for focused planning in quarters, weeks, and days.`);
  lines.push('');

  if (posts.length > 0) {
    lines.push('## Posts');
    lines.push('');
    for (const p of posts) {
      lines.push(`- [${p.data.title}](${postUrl(p.id)}): ${p.data.description}`);
    }
    lines.push('');
  }

  lines.push('## Feeds');
  lines.push('');
  lines.push(`- [RSS](${SITE.url}/rss.xml)`);
  lines.push(`- [Sitemap](${SITE.url}/sitemap-index.xml)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
