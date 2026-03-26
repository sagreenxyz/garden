export interface RelatedItem {
  title: string;
  slug: string;
  url: string;
}

interface CollectionEntry {
  slug: string;
  data: {
    title: string;
    tags?: string[];
  };
}

/**
 * Returns up to `limit` items from `items` that share at least one tag with
 * `currentTags`, sorted by number of shared tags descending. Excludes the
 * current page identified by `currentSlug`.
 */
export function getRelatedContent(
  currentSlug: string,
  currentTags: string[],
  items: CollectionEntry[],
  urlBuilder: (slug: string) => string,
  limit = 5
): RelatedItem[] {
  return items
    .filter((item) => item.slug !== currentSlug)
    .map((item) => ({
      item,
      sharedTags: (item.data.tags ?? []).filter((t) => currentTags.includes(t)).length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map(({ item }) => ({
      title: item.data.title,
      slug: item.slug,
      url: urlBuilder(item.slug),
    }));
}
