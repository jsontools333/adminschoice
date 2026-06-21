import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Original publish date — preserved from WordPress for SEO continuity
    pubDate: z.coerce.date(),
    // When the content was last meaningfully revised
    updatedDate: z.coerce.date().optional(),
    // Which layout to render: 'reference' (sidebar TOC) or 'guide' (clean reading)
    pageType: z.enum(['reference', 'guide']).default('guide'),
    // Topic cluster — drives navigation and related-post logic
    topic: z.enum([
      'scheduling', 'shell', 'sysadmin', 'devops',
      'networking', 'python', 'security', 'legacy',
    ]),
    // Reading-time eyebrow and difficulty signal
    readingTime: z.string().optional(),
    tier: z.string().optional(),
    // Tags for finer-grained relation
    tags: z.array(z.string()).default([]),
    // Tested-on environments, shown in the page meta strip
    testedOn: z.array(z.string()).default([]),
    // Whether this is featured on the homepage
    featured: z.boolean().default(false),
    // SEO: explicit canonical if the slug changed
    canonicalSlug: z.string().optional(),
  }),
});

export const collections = { posts };
