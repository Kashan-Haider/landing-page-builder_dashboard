import { z } from 'zod';
import type { FieldDefinition } from './base-field-types';

export const SEO_FIELDS: Record<string, FieldDefinition> = {
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
  }
};
