import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldDefinition } from '../../types/field-definitions';
import { getNestedValue } from '../../types/field-definitions';
import { 
  TextInput, 
  TextAreaInput, 
  SelectInput, 
  CheckboxInput, 
  ColorPicker 
} from '../ui/inputs';
import { 
  ArrayTextInput, 
  ArrayObjectInput, 
  ImageUpload 
} from './ArrayInputs';

interface DynamicFieldProps {
  definition: FieldDefinition;
  path: string;
  value?: any;
  onChange?: (value: any) => void;
  parentData?: any;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({
  definition,
  path,
  value,
  onChange,
  parentData
}) => {
  const form = useFormContext();
  const watchedValue = form ? form.watch(path) : value;
  const errors = form?.formState?.errors || {};
  
  // Get error for this field
  const fieldError = getNestedValue(errors, path)?.message;

  // Check dependencies
  const isVisible = definition.dependencies
    ? definition.dependencies.condition(
        form ? form.watch(definition.dependencies.field) : 
        getNestedValue(parentData, definition.dependencies.field)
      )
    : true;

  if (!isVisible) return null;

  // Handle field value changes
  const handleChange = (newValue: any) => {
    if (form) {
      form.setValue(path, newValue);
    } else if (onChange) {
      onChange(newValue);
    }
  };

  // Get current value
  const currentValue = form ? watchedValue : value;

  switch (definition.type) {
    case 'text':
    case 'email':
    case 'url':
      return (
        <TextInput
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          placeholder={definition.placeholder}
          type={definition.type as 'text' | 'email' | 'url'}
          error={fieldError}
          required={definition.required}
        />
      );

    case 'number':
      return (
        <TextInput
          label={definition.label}
          value={currentValue?.toString() || ''}
          onChange={(val) => handleChange(val ? Number(val) : undefined)}
          placeholder={definition.placeholder}
          type="number"
          error={fieldError}
          required={definition.required}
        />
      );

    case 'textarea':
      return (
        <TextAreaInput
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          placeholder={definition.placeholder}
          error={fieldError}
          required={definition.required}
        />
      );

    case 'select':
      return (
        <SelectInput
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          options={definition.options || []}
          error={fieldError}
          required={definition.required}
        />
      );

    case 'boolean':
      return (
        <CheckboxInput
          label={definition.label}
          checked={currentValue || false}
          onChange={handleChange}
          error={fieldError}
        />
      );

    case 'color':
      return (
        <ColorPicker
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          error={fieldError}
          required={definition.required}
        />
      );

    case 'image':
      return (
        <ImageUpload
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          error={fieldError}
        />
      );

    case 'array-text':
      return (
        <ArrayTextInput
          label={definition.label}
          value={currentValue || []}
          onChange={handleChange}
          error={fieldError}
          placeholder={definition.placeholder}
        />
      );

    case 'array-object':
      if (!definition.arrayItemType) {
        return <div>Error: Array object type missing item definition</div>;
      }
      return (
        <ArrayObjectInput
          label={definition.label}
          value={currentValue || []}
          onChange={handleChange}
          itemDefinition={definition.arrayItemType}
          path={path}
          error={fieldError}
        />
      );

    case 'rich-text':
      // For now, use textarea. You can later integrate a rich text editor like TinyMCE or Quill
      return (
        <TextAreaInput
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          placeholder={definition.placeholder}
          rows={6}
          error={fieldError}
          required={definition.required}
        />
      );

    case 'date':
      return (
        <TextInput
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          type="text"
          placeholder="YYYY-MM-DD"
          error={fieldError}
          required={definition.required}
        />
      );

    case 'time':
      return (
        <TextInput
          label={definition.label}
          value={currentValue || ''}
          onChange={handleChange}
          type="text"
          placeholder="HH:MM"
          error={fieldError}
          required={definition.required}
        />
      );

    case 'json':
      return (
        <TextAreaInput
          label={definition.label}
          value={currentValue ? JSON.stringify(currentValue, null, 2) : ''}
          onChange={(val) => {
            try {
              handleChange(val ? JSON.parse(val) : undefined);
            } catch {
              // Invalid JSON, keep as string for now
              handleChange(val);
            }
          }}
          placeholder="Enter valid JSON"
          rows={6}
          error={fieldError}
          required={definition.required}
        />
      );

    case 'multi-select':
      // For now, use array-text. You can later implement a proper multi-select component
      return (
        <ArrayTextInput
          label={definition.label}
          value={Array.isArray(currentValue) ? currentValue : []}
          onChange={handleChange}
          error={fieldError}
          placeholder={`Add ${definition.label.toLowerCase()}`}
        />
      );

    default:
      return (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700">
            Unsupported field type: {definition.type}
          </p>
        </div>
      );
  }
};

// Wrapper component for fields that don't need form context
export const StandaloneDynamicField: React.FC<DynamicFieldProps> = (props) => {
  return <DynamicField {...props} />;
};
