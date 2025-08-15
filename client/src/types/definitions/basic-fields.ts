import { z } from 'zod';
import type { FieldDefinition } from './base-field-types';

export const BASIC_FIELDS: Record<string, FieldDefinition> = {
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
  }
};
