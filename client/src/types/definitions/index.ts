// Export types and interfaces
export type { FieldType, FieldDefinition } from './base-field-types';

// Export all field definition collections
export { BASIC_FIELDS } from './basic-fields';
export { SEO_FIELDS } from './seo-fields';
export { BUSINESS_CONTACT_FIELDS } from './business-contact-fields';
export { THEME_FIELDS } from './theme-fields';
export { SECTION_ARRAY_FIELDS, SINGLE_SECTION_FIELDS } from './section-fields';
export { SERVICE_AREA_FIELDS, SOCIAL_MEDIA_FIELDS, IMAGE_FIELDS } from './service-area-fields';

// Export utility functions
export { getNestedValue, setNestedValue } from '../../utils/field-helpers';

// Import all field definitions
import { BASIC_FIELDS } from './basic-fields';
import { SEO_FIELDS } from './seo-fields';
import { BUSINESS_CONTACT_FIELDS } from './business-contact-fields';
import { THEME_FIELDS } from './theme-fields';
import { SECTION_ARRAY_FIELDS, SINGLE_SECTION_FIELDS } from './section-fields';
import { SERVICE_AREA_FIELDS, SOCIAL_MEDIA_FIELDS, IMAGE_FIELDS } from './service-area-fields';
import type { FieldDefinition } from './base-field-types';

// Consolidated field definitions - backwards compatible
export const LANDING_PAGE_FIELDS: Record<string, FieldDefinition> = {
  ...BASIC_FIELDS,
  ...SEO_FIELDS,
  ...BUSINESS_CONTACT_FIELDS,
  ...THEME_FIELDS,
  ...SECTION_ARRAY_FIELDS,
  ...SINGLE_SECTION_FIELDS,
  ...SERVICE_AREA_FIELDS,
  ...SOCIAL_MEDIA_FIELDS,
  ...IMAGE_FIELDS
};
