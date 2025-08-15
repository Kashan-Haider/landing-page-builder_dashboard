import { z } from 'zod';
import type { FieldDefinition } from './base-field-types';

export const SERVICE_AREA_FIELDS: Record<string, FieldDefinition> = {
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
  }
};

export const SOCIAL_MEDIA_FIELDS: Record<string, FieldDefinition> = {
  'socialLink.name': {
    key: 'name',
    label: 'Social Links Group Name',
    type: 'text',
    required: true,
    validation: z.string().min(1)
  },
  'socialLink.socialPlatforms': {
    key: 'socialPlatforms',
    label: 'Social Platforms',
    type: 'array-object',
    arrayItemType: {
      platform: {
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
      url: {
        key: 'url',
        label: 'Social Media URL',
        type: 'url',
        required: true,
        validation: z.string().url()
      }
    }
  }
};

export const IMAGE_FIELDS: Record<string, FieldDefinition> = {
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
