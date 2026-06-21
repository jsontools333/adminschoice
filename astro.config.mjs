import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';


export default defineConfig({
  site: 'https://adminschoice.com',
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      // Terminal-accurate syntax highlighting
      theme: 'github-dark',
      wrap: false,
    },
  },
  build: {
    // Clean URLs with trailing slashes to match the old WordPress structure
    format: 'directory',
  },
});
