// Frontend validation utilities using Zod schemas
// This mirrors the backend validation for consistent error handling

import { z } from "zod";

// CTA Button Schema
export const ctaButtonSchema = z.object({
  label: z.string().min(1, "Button label is required"),
  href: z.string().min(1, "Button href is required"),
  style: z.enum(["primary", "secondary"]).default("primary"),
});

// Hero Section Schema
export const heroSectionSchema = z.object({
  title: z.string().min(3, "Hero title must be at least 3 characters"),
  subtitle: z.string().min(1, "Hero subtitle is required"),
  description: z.string().min(1, "Hero description is required"),
  ctaButtons: z.array(ctaButtonSchema).optional(),
});

// About Section Schema
export const aboutSectionSchema = z.object({
  title: z.string().min(1, "About title is required"),
  description: z.string().min(1, "About description is required"),
  features: z.array(z.string()).default([]),
  ctaButton: ctaButtonSchema.omit({ style: true }).optional(),
});

// Service Schema
export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required"),
  features: z.array(z.string()).default([]),
  price: z.string().optional(),
});

// Services Section Schema
export const servicesSectionSchema = z.object({
  title: z.string().min(1, "Services title is required"),
  description: z.string().min(1, "Services description is required"),
  services: z.array(serviceSchema).default([]),
});

// Gallery Section Schema
export const gallerySectionSchema = z.object({
  title: z.string().min(1, "Gallery title is required"),
  description: z.string().min(1, "Gallery description is required"),
});

// Testimonial Schema
export const testimonialSchema = z.object({
  name: z.string().min(1, "Testimonial name is required"),
  role: z.string().min(1, "Testimonial role is required"),
  company: z.string().min(1, "Testimonial company is required"),
  text: z.string().min(1, "Testimonial text is required"),
  rating: z.number().min(1).max(5).optional(),
});

// Testimonials Section Schema
export const testimonialsSectionSchema = z.object({
  title: z.string().min(1, "Testimonials title is required"),
  description: z.string().min(1, "Testimonials description is required"),
  testimonials: z.array(testimonialSchema).default([]),
});

// FAQ Schema
export const faqItemSchema = z.object({
  question: z.string().min(1, "FAQ question is required"),
  answer: z.string().min(1, "FAQ answer is required")
});

export const faqSectionSchema = z.object({
  title: z.string().min(1, "FAQ title is required"),
  description: z.string().min(1, "FAQ description is required"),
  questions: z.array(faqItemSchema).default([]),
});

// Contact Section Schema
export const contactSectionSchema = z.object({
  title: z.string().min(1, "Contact title is required"),
  description: z.string().min(1, "Contact description is required"),
  showMap: z.boolean().default(true),
});

// Footer Section Schema
export const footerSectionSchema = z.object({
  copyright: z.string().min(1, "Footer copyright is required"),
  links: z
    .array(
      z.object({
        text: z.string().min(1, "Link text is required"),
        href: z.string().min(1, "Link URL is required"),
      })
    )
    .optional(),
});

// Content Schema
export const contentSchema = z.object({
  hero: heroSectionSchema,
  about: aboutSectionSchema,
  services: servicesSectionSchema,
  gallery: gallerySectionSchema,
  testimonials: testimonialsSectionSchema,
  faq: faqSectionSchema,
  contact: contactSectionSchema,
  footer: footerSectionSchema,
});

// SEO Data Schema
export const seoDataSchema = z.object({
  title: z.string().min(1, "SEO title is required"),
  description: z.string().min(1, "SEO description is required"),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().min(3, "Canonical URL must be at least 3 characters"),
  focusedKeywords: z.array(z.string()).default([]),
  isIndex: z.boolean().default(true),
});

// Theme Data Schema
export const themeDataSchema = z.object({
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
  fontFamily: z.string().optional(),
  logoUrl: z.string().url("Logo URL must be a valid URL").optional().or(z.literal("")),
});

// Address Schema
export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().default("US"),
});

// Coordinates Schema
export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
});

// Time validation
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const timeSchema = z
  .string()
  .regex(timeRegex, "Time must be in HH:MM (24-hour) format");

// Period Schema
export const periodSchema = z.object({
  open: timeSchema,
  close: timeSchema,
});

// Business Hour Schema
export const businessHourSchema = z.object({
  day: z.string().min(1, "Day is required"),
  isClosed: z.boolean().default(false),
  periods: z.array(periodSchema).default([{ open: "09:00", close: "17:00" }]),
});

// Social Link Schema
export const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Valid URL is required"),
});

// Service Area Schema
export const serviceAreaSchema = z.object({
  city: z.string().min(1, "Service area city is required"),
  region: z.string().min(1, "Service area region is required"),
  description: z.string().min(1, "Service area description is required"),
});

// Business Data Schema
export const businessDataSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Valid email is required"),
  emergencyPhone: z.string().optional(),
  emergencyEmail: z.string().email("Valid email is required").optional().or(z.literal("")),
  address: addressSchema,
  coordinates: coordinatesSchema.optional(),
  hours: z
    .object({
      timezone: z.string().optional(),
      schedule: z.array(businessHourSchema).default([]),
    })
    .default({ schedule: [] }),
  socialLinks: z.array(socialLinkSchema).default([]),
  serviceAreas: z.array(serviceAreaSchema).default([]),
});

// Image Schema
export const imageSchema = z.object({
  slotName: z.string().min(1, "Slot name is required"),
  title: z.string().min(1, "Title is required"),
  altText: z.string().min(1, "Alt text is required"),
  category: z.string().min(1, "Category name is required"),
  imageUrl: z.string().url("Image URL must be a valid URL"),
});

// Main Landing Page Schema
export const landingPageSchema = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  businessName: z.string().min(1, "Business name is required"),
  githubUrl: z.string().url("GitHub URL must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  content: contentSchema.partial().optional(),
  seoData: seoDataSchema.partial().optional(),
  themeData: themeDataSchema.partial().optional(),
  businessData: businessDataSchema.partial().optional(),
  images: z.array(imageSchema).optional().default([]),
});

// Validation helper functions
export const validateField = (schema: z.ZodSchema, value: any): { isValid: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0]?.message || "Validation failed" };
    }
    return { isValid: false, error: "Unknown validation error" };
  }
};

export const validateSection = (sectionName: string, data: any): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  try {
    switch (sectionName) {
      case "basic":
        const basicResult = landingPageSchema.pick({ templateId: true, businessName: true, githubUrl: true }).safeParse(data);
        if (!basicResult.success) {
          basicResult.error.issues.forEach((err: any) => {
            errors[err.path.join(".")] = err.message;
            isValid = false;
          });
        }
        break;
      case "seo":
        if (data.seoData) {
          const seoResult = seoDataSchema.safeParse(data.seoData);
          if (!seoResult.success) {
            seoResult.error.issues.forEach((err: any) => {
              errors[`seoData.${err.path.join(".")}`] = err.message;
              isValid = false;
            });
          }
        }
        break;
      case "theme":
        if (data.themeData) {
          const themeResult = themeDataSchema.safeParse(data.themeData);
          if (!themeResult.success) {
            themeResult.error.issues.forEach((err: any) => {
              errors[`themeData.${err.path.join(".")}`] = err.message;
              isValid = false;
            });
          }
        }
        break;
      case "business":
        if (data.businessData) {
          const businessResult = businessDataSchema.safeParse(data.businessData);
          if (!businessResult.success) {
            businessResult.error.issues.forEach((err: any) => {
              errors[`businessData.${err.path.join(".")}`] = err.message;
              isValid = false;
            });
          }
        }
        break;
      case "images":
        if (data.images) {
          const imagesResult = z.array(imageSchema).safeParse(data.images);
          if (!imagesResult.success) {
            imagesResult.error.issues.forEach((err: any) => {
              errors[`images.${err.path.join(".")}`] = err.message;
              isValid = false;
            });
          }
        }
        break;
      default:
        // For content sections
        if (data.content && data.content[sectionName]) {
          let sectionSchema;
          switch (sectionName) {
            case "hero":
              sectionSchema = heroSectionSchema;
              break;
            case "about":
              sectionSchema = aboutSectionSchema;
              break;
            case "services":
              sectionSchema = servicesSectionSchema;
              break;
            case "gallery":
              sectionSchema = gallerySectionSchema;
              break;
            case "testimonials":
              sectionSchema = testimonialsSectionSchema;
              break;
            case "faq":
              sectionSchema = faqSectionSchema;
              break;
            case "contact":
              sectionSchema = contactSectionSchema;
              break;
            case "footer":
              sectionSchema = footerSectionSchema;
              break;
          }
          
          if (sectionSchema) {
            const sectionResult = sectionSchema.safeParse(data.content[sectionName]);
            if (!sectionResult.success) {
              sectionResult.error.issues.forEach((err: any) => {
                errors[`content.${sectionName}.${err.path.join(".")}`] = err.message;
                isValid = false;
              });
            }
          }
        }
        break;
    }
  } catch (error) {
    errors.general = "Validation error occurred";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateFullForm = (data: any): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  try {
    const result = landingPageSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((err: any) => {
        errors[err.path.join(".")] = err.message;
        isValid = false;
      });
    }
  } catch (error) {
    errors.general = "Form validation failed";
    isValid = false;
  }

  return { isValid, errors };
};
