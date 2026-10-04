import { z } from "zod";

export const ArticleSchema = z.object({
  slug: z.string().min(1),
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  date: z.string(),
  readingTime: z.string(),
  featured: z.boolean().optional(),
  href: z.string().url(),
  tags: z.array(z.string()).optional(),
});

export type ValidatedArticle = z.infer<typeof ArticleSchema>;

export const ArticlesResponseSchema = z.object({
  success: z.boolean(),
  articles: z.array(ArticleSchema),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  count: z.number(),
  fallback: z.boolean().optional(),
});

export type ValidatedArticlesResponse = z.infer<typeof ArticlesResponseSchema>;

export const VideoSchema = z.object({
  slug: z.string().min(1),
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  date: z.string(),
  duration: z.string().optional(),
  featured: z.boolean().default(false),
  href: z.string().url(),
  thumbnail: z.string().url().optional(),
});

export type ValidatedVideo = z.infer<typeof VideoSchema>;

export const VideosResponseSchema = z.object({
  success: z.boolean(),
  videos: z.array(VideoSchema),
  categories: z.array(z.string()).optional(),
  count: z.number(),
  fallback: z.boolean().optional(),
});

export type ValidatedVideosResponse = z.infer<typeof VideosResponseSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  category: z.string().min(1),
  technologies: z.array(z.string()),
  href: z.string().url(),
  stars: z.number().optional(),
  forks: z.number().optional(),
  updatedAt: z.string().optional(),
});

export type ValidatedProject = z.infer<typeof ProjectSchema>;

export const ProjectsResponseSchema = z.object({
  success: z.boolean(),
  projects: z.array(ProjectSchema),
  categories: z.array(z.string()).optional(),
  count: z.number(),
  fallback: z.boolean().optional(),
});

export type ValidatedProjectsResponse = z.infer<typeof ProjectsResponseSchema>;
