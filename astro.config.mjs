import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Site URL is duplicated in src/consts.ts so JSON-LD/canonical components
// can read it without importing from astro.config. Keep both in sync.
export default defineConfig({
  site: 'https://blog.focusmode.one',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: 'auto' },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
});
