import { z } from 'zod';
import type { FieldDefinition } from './base-field-types';

export const BUSINESS_CONTACT_FIELDS: Record<string, FieldDefinition> = {
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
  }
};
