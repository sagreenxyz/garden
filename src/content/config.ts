import { defineCollection, z } from 'astro:content';

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
  }),
});

// ── Presentations ────────────────────────────────────────────────────────────
const presentationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.date(),
    draft: z.boolean().default(false),
    slideCount: z.number().optional(),
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

export const collections = {
  encyclopedia: encyclopediaCollection,
  courses: coursesCollection,
  notes: notesCollection,
  presentations: presentationsCollection,
  quizzes: quizzesCollection,
};
