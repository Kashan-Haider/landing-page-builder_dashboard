import { z } from "zod";
import { contentSchema } from "./contentSchemas";
import { businessDataSchema } from "./businessSchemas";
import { seoDataSchema, themeDataSchema } from "./seoThemeSchemas";
import { imageSchema, createImageSchema, createWebhookSchema } from "./imageWebhookSchemas";

/**
 * Main page schemas that combine all validation schemas
 */

export const createLandingPageSchema = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  businessName: z.string().min(1, "Business name is required"),
  githubUrl: z.string().url().optional(),
  content: contentSchema,
  seoData: seoDataSchema,
  themeData: themeDataSchema,
  businessData: businessDataSchema,
  images: z.array(imageSchema).optional().default([]), // optional array of images
});

export const updateLandingPageSchema = z.object({
  templateId: z.string().optional(),
  businessName: z.string().min(1).optional(),
  githubUrl: z.string().url().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  content: contentSchema.partial().optional(),
  seoData: seoDataSchema.partial().optional(),
  themeData: themeDataSchema.partial().optional(),
  businessData: businessDataSchema.partial().optional(),
  images: z.array(imageSchema).optional(), // Add images field for updates
});

// Export types
export type CreateLandingPageInput = z.infer<typeof createLandingPageSchema>;
export type UpdateLandingPageInput = z.infer<typeof updateLandingPageSchema>;
export type CreateImageInput = z.infer<typeof createImageSchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
