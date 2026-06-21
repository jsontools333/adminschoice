# Admin's Choice — Astro site

A complete Astro rebuild of adminschoice.com, migrated from WordPress.

## What's here

- **113 posts** converted from the WordPress export to MDX (`src/content/posts/`)
- **2 hand-authored crown jewels** (crontab-quick-reference, ssh-without-password)
- **2 layouts**: `reference` (sidebar TOC) and `guide` (clean reading column)
- **Orange brand** (#ff8a4c) with terminal-green code blocks, light/dark mode
- **Full SEO**: per-page OG tags, canonical URLs, TechArticle structured data
- **_redirects** in `public/` — 35 pruned URLs (4× 301, 31× 410)

## Run it

```bash
npm install
npm run dev      # local preview at localhost:4321
npm run build    # static output to dist/
```

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repo
2. In Cloudflare Pages: connect the repo
3. Build command: `npm run build`
4. Output directory: `dist`
5. The `public/_redirects` file is picked up automatically

## Still to do (audit pass)

- Images: 78 referenced images need downloading from /wp-content/uploads/ to public/images/
- 4 short stub posts flagged for review (crontab-generator, getting-started-with-python, linux-rpms, python-installation)
- Cross-check redirect targets (/solaris-certification/, /linux-basics/) exist or repoint
- Re-add sitemap integration with a version matching the installed Astro
- Wire up category/topic index pages (/topics/...)
- Add the favicon PNG variants (16px, 192px) and remaining OG variants
# adminschoice
