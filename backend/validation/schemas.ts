import { z } from 'zod';

// Basic entity schemas
export const businessHourSchema = z.object({
  day: z.string().min(1, 'Day is required'),
  hours: z.string().min(1, 'Hours are required'),
  isClosed: z.boolean()
});

export const businessContactSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  phone: z.string().min(1, 'Phone is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone is required'),
  email: z.string().email('Valid email is required'),
  emergencyEmail: z.string().email('Valid emergency email is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  latitude: z.number(),
  longitude: z.number(),
  businessHours: z.array(businessHourSchema).optional()
});

export const seoSettingsSchema = z.object({
  title: z.string().min(1, 'SEO title is required'),
  description: z.string().min(1, 'SEO description is required'),
  keywords: z.array(z.string()).default([])
});

export const themeSchema = z.object({
  primaryColor: z.string().min(1, 'Primary color is required'),
  secondaryColor: z.string().min(1, 'Secondary color is required')
});

export const socialPlatformSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Valid URL is required')
});

export const socialLinkSchema = z.object({
  name: z.string().default('Social Links'),
  socialPlatforms: z.array(socialPlatformSchema).optional()
});

export const imageSchema = z.object({
  imageId: z.string().min(1, 'Image ID is required'),
  title: z.string().min(1, 'Image title is required'),
  altText: z.string().min(1, 'Alt text is required'),
  imageUrl: z.string().url('Valid image URL is required').or(z.string().min(1, 'Image URL is required')),
  category: z.string().default('hero'),
  description: z.string().optional()
});

export const imagePoolSchema = z.object({
  name: z.string().default('Landing Page Images'),
  description: z.string().default('Images for this landing page'),
  images: z.array(imageSchema).min(1, 'At least one image is required')
});

// Section schemas
export const heroSectionSchema = z.object({
  title: z.string().min(3, 'Hero title must be at least 3 characters'),
  subtitle: z.string().min(1, 'Hero subtitle is required'),
  description: z.string().min(1, 'Hero description is required')
});

export const aboutSectionSchema = z.object({
  title: z.string().min(1, 'About title is required'),
  description: z.string().min(1, 'About description is required'),
  features: z.array(z.string()).default([])
});

export const servicesSectionSchema = z.object({
  title: z.string().min(1, 'Services title is required'),
  description: z.string().min(1, 'Services description is required')
});

export const gallerySectionSchema = z.object({
  title: z.string().min(1, 'Gallery title is required'),
  description: z.string().min(1, 'Gallery description is required')
});

export const testimonialsSectionSchema = z.object({
  title: z.string().min(1, 'Testimonials title is required'),
  description: z.string().min(1, 'Testimonials description is required')
});

export const faqSectionSchema = z.object({
  title: z.string().min(1, 'FAQ title is required'),
  description: z.string().min(1, 'FAQ description is required')
});

export const serviceAreaSectionSchema = z.object({
  title: z.string().min(1, 'Service area title is required'),
  description: z.string().min(1, 'Service area description is required')
});

export const businessDetailSubSectionSchema = z.object({
  title: z.string().min(1, 'Business detail title is required'),
  description: z.string().min(1, 'Business detail description is required'),
  ctaTitle: z.string().min(1, 'CTA title is required')
});

export const businessDetailsSectionSchema = z.object({
  title: z.string().min(1, 'Business details title is required'),
  sections: z.array(businessDetailSubSectionSchema).optional()
});

export const companyOverviewSubSectionSchema = z.object({
  title: z.string().min(1, 'Company overview title is required'),
  description: z.string().min(1, 'Company overview description is required')
});

export const companyOverviewSectionSchema = z.object({
  title: z.string().min(1, 'Company overview title is required'),
  sections: z.array(companyOverviewSubSectionSchema).optional()
});

export const serviceHighlightsSectionSchema = z.object({
  title: z.string().min(1, 'Service highlights title is required')
});

export const preFooterSectionSchema = z.object({
  description: z.string().min(1, 'Pre-footer description is required')
});

export const footerSectionSchema = z.object({
  copyright: z.string().min(1, 'Footer copyright is required')
});

export const serviceAreaSchema = z.object({
  city: z.string().min(1, 'Service area city is required'),
  region: z.string().min(1, 'Service area region is required'),
  description: z.string().min(1, 'Service area description is required')
});

// Main landing page creation schema
export const createLandingPageSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  businessName: z.string().min(1, 'Business name is required'),
  githubUrl: z.string().url('Valid GitHub URL is required').optional(),
  
  // Basic entities (can be provided as objects or IDs)
  businessContact: businessContactSchema.optional(),
  businessContactId: z.string().optional(),
  seoSettings: seoSettingsSchema.optional(),
  seoSettingsId: z.string().optional(),
  theme: themeSchema.optional(),
  themeId: z.string().optional(),
  
  // Required sections
  serviceArea: serviceAreaSchema,
  socialLink: socialLinkSchema,
  image: imagePoolSchema,
  heroSection: heroSectionSchema,
  aboutSection: aboutSectionSchema,
  servicesSection: servicesSectionSchema,
  gallerySection: gallerySectionSchema,
  testimonialsSection: testimonialsSectionSchema,
  faqSection: faqSectionSchema,
  serviceAreaSection: serviceAreaSectionSchema,
  businessDetailsSection: businessDetailsSectionSchema,
  companyOverviewSection: companyOverviewSectionSchema,
  serviceHighlightsSection: serviceHighlightsSectionSchema,
  preFooterSection: preFooterSectionSchema,
  footerSection: footerSectionSchema
}).refine((data) => {
  // Ensure either the entity object or ID is provided for required relations
  const hasBusinessContact = data.businessContact || data.businessContactId;
  const hasSeoSettings = data.seoSettings || data.seoSettingsId;
  const hasTheme = data.theme || data.themeId;
  
  return hasBusinessContact && hasSeoSettings && hasTheme;
}, {
  message: 'businessContact, seoSettings, and theme must be provided (either as objects or IDs)'
});

// Update landing page schema (all fields optional except ID)
export const updateLandingPageSchema = z.object({
  templateId: z.string().optional(),
  businessName: z.string().min(1).optional(),
  githubUrl: z.string().url().optional(),
  businessContact: businessContactSchema.partial().optional(),
  seoSettings: seoSettingsSchema.partial().optional(),
  heroSection: heroSectionSchema.partial().optional()
});

// Webhook schemas
export const createWebhookSchema = z.object({
  name: z.string().min(1, 'Webhook name is required'),
  url: z.string().url('Valid webhook URL is required'),
  events: z.array(z.enum(['created', 'updated'])).min(1, 'At least one event is required'),
  isActive: z.boolean().default(true)
});

export type CreateLandingPageInput = z.infer<typeof createLandingPageSchema>;
export type UpdateLandingPageInput = z.infer<typeof updateLandingPageSchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
