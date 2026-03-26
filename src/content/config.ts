import { defineCollection, z } from 'astro:content';

// ── Nursing curriculum alignment schema (shared) ──────────────────────────
// AACN Essentials domain IDs: D1–D10
const aacnEssentialRef = z.enum(['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10']);
// QSEN competency IDs
const qsenRef = z.enum(['PCC', 'TC', 'EBP', 'QI', 'S', 'I']);
// NCLEX-NG Clinical Judgment Model layer IDs
const nclexLayerRef = z.enum(['RC', 'AC', 'PH', 'GS', 'TA', 'EO']);
// NCLEX-NG Client Needs category IDs
const nclexCategoryRef = z.enum([
  'SECE',
  'HPM',
  'PI',
  'PhysI',
  'MC',
  'SIC',
  'BCC',
  'PPT',
  'RRP',
  'PA',
]);
// Accreditation standard IDs (CCNE and ACEN)
const accreditationRef = z.enum([
  'CCNE-I',
  'CCNE-II',
  'CCNE-III',
  'CCNE-IV',
  'ACEN-1',
  'ACEN-2',
  'ACEN-3',
  'ACEN-4',
  'ACEN-5',
  'ACEN-6',
]);

const curriculumAlignment = z.object({
  /** AACN Essentials (2021) domain references, e.g. ["D1","D5"] */
  aacnEssentials: z.array(aacnEssentialRef).default([]),
  /** QSEN competency references, e.g. ["PCC","EBP"] */
  qsenCompetencies: z.array(qsenRef).default([]),
  /** NCLEX-NG Clinical Judgment Measurement Model layer references */
  nclexLayers: z.array(nclexLayerRef).default([]),
  /** NCLEX-NG Client Needs category references */
  nclexCategories: z.array(nclexCategoryRef).default([]),
  /** CCNE / ACEN accreditation standard references */
  accreditationRefs: z.array(accreditationRef).default([]),
  /** Explicit learning objectives for this content item */
  learningObjectives: z.array(z.string()).default([]),
});

// ── Encyclopedia ────────────────────────────────────────────────────────────
const encyclopediaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
    /** Optional nursing curriculum alignment metadata */
    curriculum: curriculumAlignment.optional(),
  }),
});

// ── Courses ─────────────────────────────────────────────────────────────────
const coursesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    publishedAt: z.date(),
    draft: z.boolean().default(false),
    /** Optional nursing curriculum alignment metadata */
    curriculum: curriculumAlignment.optional(),
  }),
});

// ── Notes ───────────────────────────────────────────────────────────────────
const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
    /** Visibility: public notes appear in /notes/, private/protected in /private/notes/ only */
    visibility: z.enum(['public', 'private', 'protected']).default('public'),
    /** Note type for categorisation */
    noteType: z
      .enum(['meeting', 'idea', 'reference', 'task', 'research', 'general', 'educational', 'blog'])
      .default('general'),
    /** Review state — notes with 'needs-review' are kept as drafts pending confirmation */
    reviewState: z.enum(['draft', 'needs-review', 'published']).default('published'),
    /** Human-readable reason why review is needed (populated by automation) */
    reviewReason: z.string().optional(),
    /** Agent confidence level when this note was auto-generated */
    confidence: z.enum(['high', 'medium', 'low']).optional(),
    /** URL of the originating GitHub Issue (provenance) */
    sourceIssue: z.string().url().optional(),
    /** External source URL for the note content */
    sourceUrl: z.string().url().optional(),
    /** Internal or external links related to this note */
    relatedLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    /** Slug of another note this may duplicate */
    duplicateOf: z.string().optional(),
    /** Educational metadata — only relevant when noteType is 'educational' */
    educationalMeta: z
      .object({
        /** BSN subject area, e.g. "Foundations of Care", "Pharmacology", "Med-Surg" */
        subjectArea: z.string().optional(),
        /** Target audience / level */
        audienceLevel: z
          .enum(['pre-nursing', 'BSN-1', 'BSN-2', 'BSN-3', 'BSN-4', 'RN-refresher'])
          .optional(),
        /** NCLEX-NG Client Needs categories this post addresses */
        nclexCategories: z.array(nclexCategoryRef).default([]),
        /** AACN Essentials domains this post addresses */
        aacnEssentials: z.array(aacnEssentialRef).default([]),
        /** Estimated reading / study time in minutes */
        studyTimeMinutes: z.number().optional(),
        /** Key takeaways — short bullet phrases */
        keyTakeaways: z.array(z.string()).default([]),
        /** Expert review status */
        expertReviewStatus: z
          .enum(['pending', 'in-progress', 'reviewed', 'approved'])
          .default('pending'),
        /** URL of the GitHub Issue where expert feedback was posted */
        expertReviewIssueUrl: z.string().url().optional(),
      })
      .optional(),
  }),
});

// ── Quizzes ──────────────────────────────────────────────────────────────────
const quizzesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    timeLimit: z.number().optional(), // minutes
    passingScore: z.number().min(0).max(100).default(70),
    draft: z.boolean().default(false),
    questions: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        type: z.enum(['multiple-choice', 'true-false', 'short-answer']),
        options: z.array(z.string()).optional(),
        answer: z.union([z.string(), z.array(z.string())]),
        explanation: z.string().optional(),
      })
    ),
  }),
});

// ── Paths ────────────────────────────────────────────────────────────────────
const pathsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    publishedAt: z.date(),
    /** Ordered array of course slugs that make up this learning path */
    courseOrder: z.array(z.string()),
  }),
});

// ── Changelog ────────────────────────────────────────────────────────────────
const changelogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    contentType: z
      .enum(['encyclopedia', 'course', 'note', 'quiz', 'presentation', 'other'])
      .default('other'),
    /** Internal link to the new content */
    relatedUrl: z.string().optional(),
  }),
});

// ── Pharmacology ─────────────────────────────────────────────────────────────
const pharmacologyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    genericName: z.string(),
    brandNames: z.array(z.string()).default([]),
    drugClass: z.string(),
    subClass: z.string().optional(),
    mechanismOfAction: z.string(),
    indications: z.array(z.string()).default([]),
    contraindications: z.array(z.string()).default([]),
    sideEffects: z
      .object({
        common: z.array(z.string()).default([]),
        serious: z.array(z.string()).default([]),
      })
      .optional(),
    nursingConsiderations: z.array(z.string()).default([]),
    patientTeaching: z.array(z.string()).default([]),
    routes: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    publishedAt: z.date(),
  }),
});

export const collections = {
  encyclopedia: encyclopediaCollection,
  courses: coursesCollection,
  notes: notesCollection,
  quizzes: quizzesCollection,
  paths: pathsCollection,
  changelog: changelogCollection,
  pharmacology: pharmacologyCollection,
};
