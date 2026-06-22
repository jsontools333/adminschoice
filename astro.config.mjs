import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://adminschoice.com',
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          // All external links open safely; affiliate hosts get rel="sponsored"
          target: '_blank',
          rel: (element) => {
            const href = element.properties?.href || '';
            const isAffiliate = /amzn\.to|amazon\.[a-z.]+|amazon-adsystem/.test(href);
            return isAffiliate
              ? ['sponsored', 'nofollow', 'noopener']
              : ['noopener', 'noreferrer'];
          },
        },
      ],
    ],
  },
  build: {
    format: 'directory',
  },
});
