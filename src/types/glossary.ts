export interface GlossaryEntry {
  term: string;
  fullForm?: string;
  definition: string;
  relatedTerms?: string[];
  slug: string;
}
