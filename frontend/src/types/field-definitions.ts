import { z } from 'zod';

export type FieldType = 
  | 'text' | 'textarea' | 'rich-text' | 'number' | 'email' | 'url'
  | 'select' | 'multi-select' | 'boolean' | 'date' | 'time'
  | 'image' | 'color' | 'json' | 'array-text' | 'array-object';

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  validation?: z.ZodSchema;
  options?: { value: string; label: string }[];
  nested?: Record<string, FieldDefinition>;
  arrayItemType?: Record<string, FieldDefinition>;
  dependencies?: {
    field: string;
    condition: (value: any) => boolean;
  };
}

// Complete field definitions for your schema
export const LANDING_PAGE_FIELDS: Record<string, FieldDefinition> = {
  // Basic Landing Page Fields
  businessName: {
    key: 'businessName',
    label: 'Business Name',
    type: 'text',
    required: true,
    validation: z.string().min(1).max(100)
  },
  templateId: {
    key: 'templateId',
    label: 'Template ID',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  githubUrl: {
    key: 'githubUrl',
    label: 'GitHub URL',
    type: 'url',
    validation: z.string().url().optional()
  },
  
  // SEO Settings Fields
  'seoSettings.title': {
    key: 'title',
    label: 'SEO Title',
    type: 'text',
    required: true,
    validation: z.string().min(10).max(60)
  },
  'seoSettings.description': {
    key: 'description',
    label: 'Meta Description',
    type: 'textarea',
    required: true,
    validation: z.string().min(50).max(160)
  },
  'seoSettings.keywords': {
    key: 'keywords',
    label: 'Keywords',
    type: 'array-text',
    validation: z.array(z.string()).max(10)
  },
  'seoSettings.favicon': {
    key: 'favicon',
    label: 'Favicon URL',
    type: 'image',
    validation: z.string().url().optional()
  },

  // Business Contact Fields
  'businessContact.businessName': {
    key: 'businessName',
    label: 'Business Name',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'businessContact.phone': {
    key: 'phone',
    label: 'Phone Number',
    type: 'text',
    required: true,
    validation: z.string().regex(/^\+?[\d\s\-\(\)]+$/)
  },
  'businessContact.emergencyPhone': {
    key: 'emergencyPhone',
    label: 'Emergency Phone',
    type: 'text',
    validation: z.string().regex(/^\+?[\d\s\-\(\)]+$/).optional()
  },
  'businessContact.email': {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    validation: z.string().email()
  },
  'businessContact.emergencyEmail': {
    key: 'emergencyEmail',
    label: 'Emergency Email',
    type: 'email',
    validation: z.string().email().optional()
  },
  'businessContact.street': {
    key: 'street',
    label: 'Street Address',
    type: 'text',
    validation: z.string().optional()
  },
  'businessContact.city': {
    key: 'city',
    label: 'City',
    type: 'text',
    validation: z.string().optional()
  },
  'businessContact.state': {
    key: 'state',
    label: 'State',
    type: 'text',
    validation: z.string().optional()
  },
  'businessContact.zipCode': {
    key: 'zipCode',
    label: 'ZIP Code',
    type: 'text',
    validation: z.string().optional()
  },
  'businessContact.latitude': {
    key: 'latitude',
    label: 'Latitude',
    type: 'number',
    validation: z.number().optional()
  },
  'businessContact.longitude': {
    key: 'longitude',
    label: 'Longitude',
    type: 'number',
    validation: z.number().optional()
  },

  // Business Hours
  'businessContact.businessHours': {
    key: 'businessHours',
    label: 'Business Hours',
    type: 'array-object',
    arrayItemType: {
      day: {
        key: 'day',
        label: 'Day',
        type: 'select',
        options: [
          { value: 'monday', label: 'Monday' },
          { value: 'tuesday', label: 'Tuesday' },
          { value: 'wednesday', label: 'Wednesday' },
          { value: 'thursday', label: 'Thursday' },
          { value: 'friday', label: 'Friday' },
          { value: 'saturday', label: 'Saturday' },
          { value: 'sunday', label: 'Sunday' }
        ]
      },
      hours: {
        key: 'hours',
        label: 'Hours',
        type: 'text',
        dependencies: {
          field: 'isClosed',
          condition: (value) => !value
        }
      },
      isClosed: {
        key: 'isClosed',
        label: 'Closed',
        type: 'boolean'
      }
    }
  },

  // Theme Fields
  'theme.primaryColor': {
    key: 'primaryColor',
    label: 'Primary Color',
    type: 'color',
    validation: z.string().regex(/^#[0-9A-F]{6}$/i).optional()
  },
  'theme.secondaryColor': {
    key: 'secondaryColor',
    label: 'Secondary Color',
    type: 'color',
    validation: z.string().regex(/^#[0-9A-F]{6}$/i).optional()
  },

  // Hero Section Fields
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

  // About Section Fields
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

  // Services Section Fields
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

  // Gallery Section Fields
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

  // Testimonials Section Fields
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

  // FAQ Section Fields
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
  },

  // One-to-one Hero Section
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

  // One-to-one About Section
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

  // One-to-one Services Section
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

  // One-to-one Gallery Section
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

  // One-to-one Testimonials Section
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

  // One-to-one FAQ Section
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

  // One-to-one Service Area Section
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

  // One-to-one Business Details Section
  'businessDetailsSection.title': {
    key: 'title',
    label: 'Business Details Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },

  // One-to-one Company Overview Section
  'companyOverviewSection.title': {
    key: 'title',
    label: 'Company Overview Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },

  // One-to-one Service Highlights Section
  'serviceHighlightsSection.title': {
    key: 'title',
    label: 'Service Highlights Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },

  // One-to-one Pre-Footer Section
  'preFooterSection.description': {
    key: 'description',
    label: 'Pre-Footer Description',
    type: 'textarea',
    required: true,
    validation: z.string().min(1)
  },

  // One-to-one Footer Section
  'footerSection.copyright': {
    key: 'copyright',
    label: 'Copyright Text',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },

  // Service Area fields
  'serviceArea.city': {
    key: 'city',
    label: 'City',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'serviceArea.region': {
    key: 'region',
    label: 'Region',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'serviceArea.description': {
    key: 'description',
    label: 'Service Area Description',
    type: 'textarea',
    required: true,
    validation: z.string().min(1)
  },

  // Social Link fields
  'socialLink.platform': {
    key: 'platform',
    label: 'Platform',
    type: 'select',
    required: true,
    options: [
      { value: 'facebook', label: 'Facebook' },
      { value: 'twitter', label: 'Twitter' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'youtube', label: 'YouTube' },
      { value: 'tiktok', label: 'TikTok' }
    ]
  },
  'socialLink.url': {
    key: 'url',
    label: 'Social Media URL',
    type: 'url',
    required: true,
    validation: z.string().url()
  },

  // Image fields
  'image.imageId': {
    key: 'imageId',
    label: 'Image ID',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'image.title': {
    key: 'title',
    label: 'Image Title',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'image.altText': {
    key: 'altText',
    label: 'Alt Text',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'image.image': {
    key: 'image',
    label: 'Image URL',
    type: 'image',
    required: true,
    validation: z.string().url()
  }
};

// Helper function to get nested value from object
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper function to set nested value in object
export const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    } else {
      current[key] = { ...current[key] };
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
};
