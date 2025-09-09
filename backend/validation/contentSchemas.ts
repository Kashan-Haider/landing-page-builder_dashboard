import { z } from "zod";
import { ctaButtonSchema } from "./commonSchemas";

/**
 * Content section schemas for landing page sections
 */

export const businessOverviewContent = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  ctaButton: ctaButtonSchema,
});

export const businessOverviewSection = z.object({
  content: z.array(businessOverviewContent),
});

export const heroSectionSchema = z.object({
  title: z.string().min(3, "Hero title must be at least 3 characters"),
  subtitle: z.string().min(1, "Hero subtitle is required"),
  description: z.string().min(1, "Hero description is required"),
  ctaButton: ctaButtonSchema,
});

export const serviceHighlightsItemSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required")
});

export const serviceHighlightsSchema = z.object({
  title: z.string().min(1, "Service highlights title is required"),
  description: z.string().min(1, "Service highlights description is required"),
  services: z.array(serviceHighlightsItemSchema).default([]),
});

export const aboutSectionSchema = z.object({
  title: z.string().min(1, "About title is required"),
  description: z.string().min(1, "About description is required"),
  features: z.array(z.string()).default([]),
  ctaButton: ctaButtonSchema,
});

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required"),
  features: z.array(z.string()).default([]),
  price: z.string().optional(),
});

export const servicesSectionSchema = z.object({
  title: z.string().min(1, "Services title is required"),
  description: z.string().min(1, "Services description is required"),
  services: z.array(serviceSchema).default([]),
});

export const gallerySectionSchema = z.object({
  title: z.string().min(1, "Gallery title is required"),
  description: z.string().min(1, "Gallery description is required"),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "Testimonial name is required"),
  role: z.string().min(1, "Testimonial role is required"),
  company: z.string().min(1, "Testimonial company is required"),
  text: z.string().min(1, "Testimonial text is required"),
});

export const testimonialsSectionSchema = z.object({
  title: z.string().min(1, "Testimonials title is required"),
  description: z.string().min(1, "Testimonials description is required"),
  testimonials: z.array(testimonialSchema).default([]),
});

export const faqItemSchema = z.object({
  question: z.string().min(1, "FAQ question is required"),
  answer: z.string().min(1, "FAQ answer is required"),
});

export const faqSectionSchema = z.object({
  title: z.string().min(1, "FAQ title is required"),
  description: z.string().min(1, "FAQ description is required"),
  questions: z.array(faqItemSchema).default([]),
});

export const contactSectionSchema = z.object({
  title: z.string().min(1, "Contact title is required"),
  description: z.string().min(1, "Contact description is required"),
  showMap: z.boolean().default(true),
});

export const footerSectionSchema = z.object({
  copyright: z.string().min(1, "Footer copyright is required"),
  links: z
    .array(
      z.object({
        text: z.string().min(1),
        href: z.string().min(1),
      })
    )
    .optional(),
});

export const companyDetailsSectionSchema = z.object({
  heading: z.string().min(1, "Company details heading is required"),
  description: z.string().min(1, "Company details description is required"),
});

export const companyDetailsSchema = z.object({
  heading: z.string().min(1, "Company details heading is required"),
  description: z.string().min(1, "Company details description is required"),
  sections: z.array(companyDetailsSectionSchema).default([]),
});

export const ctaSectionSchema = z.object({
  subHeading: z.string().min(1, "CTA section subheading is required"),
  heading: z.string().min(1, "CTA section heading is required"),
  description: z.string().min(1, "CTA section description is required"),
  ctaButton: ctaButtonSchema,
});

export const contentSchema = z.object({
  hero: heroSectionSchema,
  serviceHighlights: serviceHighlightsSchema,
  about: aboutSectionSchema,
  services: servicesSectionSchema,
  ctaSection: ctaSectionSchema,
  gallery: gallerySectionSchema,
  businessOverview: businessOverviewSection,
  companyDetails: companyDetailsSchema.optional().default({ heading: "", description: "", sections: [] }),
  testimonials: testimonialsSectionSchema,
  faq: faqSectionSchema,
  contact: contactSectionSchema,
  footer: footerSectionSchema,
});
