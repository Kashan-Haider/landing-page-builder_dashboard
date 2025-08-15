import { z } from 'zod';
import type { FieldDefinition } from './base-field-types';

export const THEME_FIELDS: Record<string, FieldDefinition> = {
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
  }
};
