import { z } from "zod";

/**
 * Common reusable schemas used across different sections
 */

export const ctaButtonSchema = z.object({
  label: z.string().min(1, "Button label is required"),
  href: z.string().min(1, "Button href is required"),
});

export const linkSchema = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
});

// Time validation helpers
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const timeSchema = z
  .string()
  .regex(timeRegex, "Time must be in HH:MM (24-hour) format");

/**
 * A single open/close period (allows split shifts)
 */
export const periodSchema = z.object({
  open: timeSchema,
  close: timeSchema,
});
