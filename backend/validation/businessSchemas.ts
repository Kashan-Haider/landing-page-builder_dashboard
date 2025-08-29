import { z } from "zod";
import { periodSchema } from "./commonSchemas";

/**
 * Business data validation schemas
 */

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().default("US"),
});

export const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

/**
 * One day's schedule: name of day, closed flag, and an array of periods.
 */
export const businessHourSchema = z.object({
  day: z.string().min(1, "Day is required"),
  isClosed: z.boolean().default(false),
  // periods array is empty when isClosed === true
  periods: z.array(periodSchema).default([{ open: "09:00", close: "17:00" }]),
});

const DEFAULT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_SCHEDULE = DEFAULT_DAYS.map((day) => ({
  day,
  isClosed: day === "Sunday",
  periods: day === "Sunday" ? [] : [{ open: "09:00", close: "17:00" }],
}));

export const socialLinkSchema = z.object({
  platform: z.enum(["Facebook", "Instagram", "Twitter", "LinkedIn", "YouTube"], {
    message: "Platform must be one of: Facebook, Instagram, Twitter, LinkedIn, YouTube"
  }),
  url: z.string().url("Valid URL is required").refine((url) => {
    // Additional URL validation for social media platforms
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase().replace('www.', '');
      
      // Allow any valid URL for now, but could be made stricter
      return true;
    } catch {
      return false;
    }
  }, "Must be a valid social media URL"),
});

export const serviceAreaSchema = z.object({
  city: z.string().min(1, "Service area city is required"),
  region: z.string().min(1, "Service area region is required"),
  description: z.string().min(1, "Service area description is required"),
});

export const businessDataSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Valid email is required"),
  emergencyPhone: z.string().optional(),
  emergencyEmail: z.string().email().optional(),
  address: addressSchema,
  coordinates: coordinatesSchema.optional(),
  // hours is stored as JSON in PostgreSQL (fits your LandingPage.businessData Json field)
  hours: z
    .object({
      timezone: z.string().optional(), // e.g. "Asia/Singapore" (IANA tz) — helpful when interpreting times
      schedule: z.array(businessHourSchema).default(DEFAULT_SCHEDULE),
    })
    .default({ schedule: DEFAULT_SCHEDULE }),
  socialLinks: z.array(socialLinkSchema).default([]),
  serviceAreas: z.array(serviceAreaSchema).default([]),
});
