import { z } from 'zod';

export const ctaButtonSchema = z.object({
  label: z.string().min(1, 'Button label is required'),
  href: z.string().min(1, 'Button href is required'),
  style: z.enum(['primary', 'secondary']).default('primary')
});

export const heroSectionSchema = z.object({
  title: z.string().min(3, 'Hero title must be at least 3 characters'),
  subtitle: z.string().min(1, 'Hero subtitle is required'),
  description: z.string().min(1, 'Hero description is required'),
  ctaButtons: z.array(ctaButtonSchema).optional()
});

export const aboutSectionSchema = z.object({
  title: z.string().min(1, 'About title is required'),
  description: z.string().min(1, 'About description is required'),
  features: z.array(z.string()).default([]),
  ctaButton: ctaButtonSchema.omit({ style: true }).optional()
});

export const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().min(1, 'Service description is required'),
  features: z.array(z.string()).default([]),
  price: z.string().optional()
});

export const servicesSectionSchema = z.object({
  title: z.string().min(1, 'Services title is required'),
  description: z.string().min(1, 'Services description is required'),
  services: z.array(serviceSchema).default([])
});

export const gallerySectionSchema = z.object({
  title: z.string().min(1, 'Gallery title is required'),
  description: z.string().min(1, 'Gallery description is required'),
  categories: z.array(z.string()).default(['general'])
});

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Testimonial name is required'),
  role: z.string().min(1, 'Testimonial role is required'),
  company: z.string().min(1, 'Testimonial company is required'),
  text: z.string().min(1, 'Testimonial text is required'),
  rating: z.number().min(1).max(5).optional()
});

export const testimonialsSectionSchema = z.object({
  title: z.string().min(1, 'Testimonials title is required'),
  description: z.string().min(1, 'Testimonials description is required'),
  testimonials: z.array(testimonialSchema).default([])
});

export const faqItemSchema = z.object({
  question: z.string().min(1, 'FAQ question is required'),
  answer: z.string().min(1, 'FAQ answer is required'),
  category: z.string().default('general')
});

export const faqSectionSchema = z.object({
  title: z.string().min(1, 'FAQ title is required'),
  description: z.string().min(1, 'FAQ description is required'),
  questions: z.array(faqItemSchema).default([])
});

export const contactSectionSchema = z.object({
  title: z.string().min(1, 'Contact title is required'),
  description: z.string().min(1, 'Contact description is required'),
  showMap: z.boolean().default(true)
});

export const footerSectionSchema = z.object({
  copyright: z.string().min(1, 'Footer copyright is required'),
  links: z.array(z.object({
    text: z.string().min(1),
    href: z.string().min(1)
  })).optional()
});

export const contentSchema = z.object({
  hero: heroSectionSchema,
  about: aboutSectionSchema,
  services: servicesSectionSchema,
  gallery: gallerySectionSchema,
  testimonials: testimonialsSectionSchema,
  faq: faqSectionSchema,
  contact: contactSectionSchema,
  footer: footerSectionSchema
});

export const seoDataSchema = z.object({
  title: z.string().min(1, 'SEO title is required'),
  description: z.string().min(1, 'SEO description is required'),
  keywords: z.array(z.string()).default([]),
  favicon: z.string().url().optional(),
  ogImage: z.string().url().optional()
});

export const themeDataSchema = z.object({
  primaryColor: z.string().min(1, 'Primary color is required'),
  secondaryColor: z.string().min(1, 'Secondary color is required'),
  fontFamily: z.string().optional(),
  logoUrl: z.string().url().optional()
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().default('US')
});

export const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});

export const businessHourSchema = z.object({
  day: z.string().min(1, 'Day is required'),
  hours: z.string().min(1, 'Hours are required'),
  isClosed: z.boolean().default(false)
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Valid URL is required')
});

export const serviceAreaSchema = z.object({
  city: z.string().min(1, 'Service area city is required'),
  region: z.string().min(1, 'Service area region is required'),
  description: z.string().min(1, 'Service area description is required')
});

export const businessDataSchema = z.object({
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  emergencyPhone: z.string().optional(),
  emergencyEmail: z.string().email().optional(),
  address: addressSchema,
  coordinates: coordinatesSchema.optional(),
  hours: z.array(businessHourSchema).default([]),
  socialLinks: z.array(socialLinkSchema).default([]),
  serviceAreas: z.array(serviceAreaSchema).default([])
});

export const createLandingPageSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  businessName: z.string().min(1, 'Business name is required'),
  githubUrl: z.string().url().optional(),
  content: contentSchema,
  seoData: seoDataSchema,
  themeData: themeDataSchema,
  businessData: businessDataSchema
});

export const updateLandingPageSchema = z.object({
  templateId: z.string().optional(),
  businessName: z.string().min(1).optional(),
  githubUrl: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  content: contentSchema.partial().optional(),
  seoData: seoDataSchema.partial().optional(),
  themeData: themeDataSchema.partial().optional(),
  businessData: businessDataSchema.partial().optional()
});

export const createImageSchema = z.object({
  title: z.string().min(1, 'Image title is required'),
  altText: z.string().min(1, 'Alt text is required'),
  imageUrl: z.string().url('Valid image URL is required'),
  category: z.string().default('general')
});

export const createWebhookSchema = z.object({
  name: z.string().min(1, 'Webhook name is required'),
  url: z.string().url('Valid webhook URL is required'),
  events: z.array(z.string()).min(1, 'At least one event is required'),
  isActive: z.boolean().default(true)
});

export type CreateLandingPageInput = z.infer<typeof createLandingPageSchema>;
export type UpdateLandingPageInput = z.infer<typeof updateLandingPageSchema>;
export type CreateImageInput = z.infer<typeof createImageSchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
