import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = await getCollection('changelog', ({ data }) => !data.draft);
  entries.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: "What's New — Root LMS",
    description: 'New content and updates added to the Root LMS.',
    site: context.site ?? 'https://sagreenxyz.github.io',
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.publishedAt,
      description: entry.data.summary,
      link: entry.data.relatedUrl ?? `${import.meta.env.BASE_URL}changelog/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
