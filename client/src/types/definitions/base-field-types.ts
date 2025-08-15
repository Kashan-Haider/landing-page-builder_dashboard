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
