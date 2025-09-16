import { z } from "zod";

/**
 * Image validation schemas
 */

export const imageSchema = z.object({
  slotName: z.string().min(1, "Slot name is required"),
  title: z.string().min(1, "Title is required"),
  altText: z.string().min(1, "Alt text is required"),
  category: z.string().min(1, "Category name is required"),
  imageUrl: z.string().url("Image URL must be a valid URL"),
});

export const createImageSchema = z.object({
  title: z.string().min(1, "Image title is required"),
  altText: z.string().min(1, "Alt text is required"),
  imageUrl: z.string().url("Valid image URL is required"),
  slotName: z.string().min(1, "ImageSlot is required"),
  category: z.string().min(1, "Category name is required"),
});

