import { z } from 'zod';
import type { FieldDefinition } from './base-field-types';

// Array-based sections
export const SECTION_ARRAY_FIELDS: Record<string, FieldDefinition> = {
  heroSections: {
    key: 'heroSections',
    label: 'Hero Sections',
    type: 'array-object',
    arrayItemType: {
      title: {
        key: 'title',
        label: 'Hero Title',
        type: 'text',
        required: true,
        validation: z.string().min(1).max(200)
      },
      subtitle: {
        key: 'subtitle',
        label: 'Hero Subtitle',
        type: 'text',
        validation: z.string().max(300).optional()
      },
      description: {
        key: 'description',
        label: 'Hero Description',
        type: 'textarea',
        validation: z.string().optional()
      }
    }
  },
  aboutSections: {
    key: 'aboutSections',
    label: 'About Sections',
    type: 'array-object',
    arrayItemType: {
      title: {
        key: 'title',
        label: 'About Title',
        type: 'text',
        required: true,
        validation: z.string().min(1)
      },
      description: {
        key: 'description',
        label: 'About Description',
        type: 'textarea',
        required: true,
        validation: z.string().min(1)
      },
      features: {
        key: 'features',
        label: 'Features',
        type: 'array-text'
      }
    }
  },
  servicesSections: {
    key: 'servicesSections',
    label: 'Services Sections',
    type: 'array-object',
    arrayItemType: {
      title: {
        key: 'title',
        label: 'Services Title',
        type: 'text',
        required: true,
        validation: z.string().min(1)
      },
      description: {
        key: 'description',
        label: 'Services Description',
        type: 'textarea',
        validation: z.string().optional()
      }
    }
  },
  gallerySections: {
    key: 'gallerySections',
    label: 'Gallery Sections',
    type: 'array-object',
    arrayItemType: {
      title: {
        key: 'title',
        label: 'Gallery Title',
        type: 'text',
        required: true,
        validation: z.string().min(1)
      },
      description: {
        key: 'description',
        label: 'Gallery Description',
        type: 'textarea',
        validation: z.string().optional()
      }
    }
  },
  testimonialsSections: {
    key: 'testimonialsSections',
    label: 'Testimonials Sections',
    type: 'array-object',
    arrayItemType: {
      title: {
        key: 'title',
        label: 'Testimonials Title',
        type: 'text',
        required: true,
        validation: z.string().min(1)
      },
      description: {
        key: 'description',
        label: 'Testimonials Description',
        type: 'textarea',
        validation: z.string().optional()
      }
    }
  },
  faqSections: {
    key: 'faqSections',
    label: 'FAQ Sections',
    type: 'array-object',
    arrayItemType: {
      title: {
        key: 'title',
        label: 'FAQ Title',
        type: 'text',
        required: true,
        validation: z.string().min(1)
      },
      description: {
        key: 'description',
        label: 'FAQ Description',
        type: 'textarea',
        validation: z.string().optional()
      }
    }
  }
};

// Single sections
export const SINGLE_SECTION_FIELDS: Record<string, FieldDefinition> = {
  'heroSection.title': {
    key: 'title',
    label: 'Hero Title',
    type: 'text',
    required: true,
    validation: z.string().min(1).max(200)
  },
  'heroSection.subtitle': {
    key: 'subtitle',
    label: 'Hero Subtitle',
    type: 'text',
    validation: z.string().max(300).optional()
  },
  'heroSection.description': {
    key: 'description',
    label: 'Hero Description',
    type: 'textarea',
    validation: z.string().optional()
  },
  'aboutSection.title': {
    key: 'title',
    label: 'About Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'aboutSection.description': {
    key: 'description',
    label: 'About Description',
    type: 'textarea',
    required: true,
    validation: z.string().min(1)
  },
  'aboutSection.features': {
    key: 'features',
    label: 'Features',
    type: 'array-text'
  },
  'servicesSection.title': {
    key: 'title',
    label: 'Services Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'servicesSection.description': {
    key: 'description',
    label: 'Services Description',
    type: 'textarea',
    validation: z.string().optional()
  },
  'gallerySection.title': {
    key: 'title',
    label: 'Gallery Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'gallerySection.description': {
    key: 'description',
    label: 'Gallery Description',
    type: 'textarea',
    validation: z.string().optional()
  },
  'testimonialsSection.title': {
    key: 'title',
    label: 'Testimonials Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'testimonialsSection.description': {
    key: 'description',
    label: 'Testimonials Description',
    type: 'textarea',
    validation: z.string().optional()
  },
  'faqSection.title': {
    key: 'title',
    label: 'FAQ Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'faqSection.description': {
    key: 'description',
    label: 'FAQ Description',
    type: 'textarea',
    validation: z.string().optional()
  },
  'serviceAreaSection.title': {
    key: 'title',
    label: 'Service Area Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'serviceAreaSection.description': {
    key: 'description',
    label: 'Service Area Description',
    type: 'textarea',
    validation: z.string().optional()
  },
  'businessDetailsSection.title': {
    key: 'title',
    label: 'Business Details Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'companyOverviewSection.title': {
    key: 'title',
    label: 'Company Overview Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'serviceHighlightsSection.title': {
    key: 'title',
    label: 'Service Highlights Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'preFooterSection.description': {
    key: 'description',
    label: 'Pre-Footer Description',
    type: 'textarea',
    required: true,
    validation: z.string().min(1)
  },
  'footerSection.copyright': {
    key: 'copyright',
    label: 'Copyright Text',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  }
};
