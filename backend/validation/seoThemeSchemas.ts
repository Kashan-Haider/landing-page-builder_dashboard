import { z } from "zod";

/**
 * SEO and theme validation schemas
 */

export const seoDataSchema = z.object({
  title: z.string().min(1, "SEO title is required"),
  description: z.string().min(1, "SEO description is required"),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().min(3, "Canonical URL"),
  focusedKeywords: z.array(z.string()).default([]),
  isIndex: z.boolean().default(true),
});

export const themeDataSchema = z.object({
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
});
