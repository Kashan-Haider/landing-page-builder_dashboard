import { z } from "zod";
import { contentSchema } from "./contentSchemas";
import { businessDataSchema } from "./businessSchemas";
import { seoDataSchema, themeDataSchema } from "./seoThemeSchemas";
import { imageSchema, createImageSchema, createWebhookSchema } from "./imageWebhookSchemas";

/**
 * Main page schemas that combine all validation schemas
 */

// Enhanced schema for comprehensive landing page creation
export const createEnhancedLandingPageSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  templateId: z.string().min(1, "Template ID is required"),
  githubUrl: z.string().url("Valid GitHub URL is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  emergencyPhone: z.string().optional(),
  emergencyEmail: z.string().email().optional().or(z.literal("")),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  services: z.array(z.object({
    name: z.string().min(1, "Service name is required"),
    description: z.string().optional(),
    price: z.string().optional(),
    features: z.array(z.string()).default([]),
  })).default([]),
  serviceAreas: z.array(z.object({
    city: z.string().min(1, "Service area city is required"),
    region: z.string().min(1, "Service area region is required"),
    description: z.string().optional(),
  })).default([]),
  themeData: themeDataSchema,
});

// Simplified schema for basic landing page creation (kept for backward compatibility)
export const createSimpleLandingPageSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Original complex schema (kept for backward compatibility)
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
export type CreateEnhancedLandingPageInput = z.infer<typeof createEnhancedLandingPageSchema>;
export type CreateSimpleLandingPageInput = z.infer<typeof createSimpleLandingPageSchema>;
export type CreateLandingPageInput = z.infer<typeof createLandingPageSchema>;
export type UpdateLandingPageInput = z.infer<typeof updateLandingPageSchema>;
export type CreateImageInput = z.infer<typeof createImageSchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
