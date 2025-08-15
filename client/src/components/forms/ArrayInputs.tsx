import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button, Card } from '../ui/inputs';
import type { FieldDefinition } from '../../types/field-definitions';

interface ArrayTextInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
}

interface ArrayObjectInputProps {
  label: string;
  value: any[];
  itemDefinition: Record<string, FieldDefinition>;
  onChange: (value: any[]) => void;
  path: string;
  error?: string;
}

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (imageUrl: string) => void;
  error?: string;
}

// Array Text Input Component
export const ArrayTextInput: React.FC<ArrayTextInputProps> = ({
  label,
  value = [],
  onChange,
  error,
  placeholder
}) => {
  const addItem = () => {
    onChange([...value, '']);
  };

  const updateItem = (index: number, newValue: string) => {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2 mb-4">
      <label className="block text-sm font-medium text-slate-200 mb-1">
        {label}
      </label>
      
      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder || `${label} ${index + 1}`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeItem(index)}
            className="flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={addItem}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label}
      </Button>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Array Object Input Component
export const ArrayObjectInput: React.FC<ArrayObjectInputProps> = ({
  label,
  value = [],
  itemDefinition,
  onChange,
  path: _path, // Path parameter for future extensibility
  error
}) => {
  // Note: _path is reserved for future use when implementing nested field paths
  const addItem = () => {
    const newItem = Object.keys(itemDefinition).reduce((acc, key) => {
      const fieldDef = itemDefinition[key];
      if (fieldDef.type === 'boolean') {
        acc[key] = false;
      } else if (fieldDef.type === 'array-text') {
        acc[key] = [];
      } else if (fieldDef.type === 'number') {
        acc[key] = 0;
      } else {
        acc[key] = '';
      }
      return acc;
    }, {} as any);
    
    // Add unique ID for React keys
    newItem.id = Date.now().toString();
    onChange([...value, newItem]);
  };

  const updateItem = (index: number, field: string, newValue: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const renderField = (
    item: any, 
    index: number, 
    fieldKey: string, 
    fieldDef: FieldDefinition
  ) => {
    const fieldValue = item[fieldKey];
    
    switch (fieldDef.type) {
      case 'text':
        return (
          <input
            type="text"
            value={fieldValue || ''}
            onChange={(e) => updateItem(index, fieldKey, e.target.value)}
            placeholder={fieldDef.placeholder}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={fieldValue || ''}
            onChange={(e) => updateItem(index, fieldKey, e.target.value)}
            placeholder={fieldDef.placeholder}
            rows={3}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
          />
        );

      case 'select':
        return (
          <select
            value={fieldValue || ''}
            onChange={(e) => updateItem(index, fieldKey, e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select {fieldDef.label}</option>
            {fieldDef.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={fieldValue || false}
              onChange={(e) => updateItem(index, fieldKey, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-500 rounded"
            />
            <label className="ml-2 block text-sm text-slate-200">
              {fieldDef.label}
            </label>
          </div>
        );

      case 'array-text':
        return (
          <ArrayTextInput
            label=""
            value={fieldValue || []}
            onChange={(newValue) => updateItem(index, fieldKey, newValue)}
            placeholder={`Add ${fieldDef.label.toLowerCase()}`}
          />
        );

      default:
        return (
          <input
            type="text"
            value={fieldValue || ''}
            onChange={(e) => updateItem(index, fieldKey, e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        );
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <label className="block text-sm font-medium text-slate-200 mb-2">
        {label}
      </label>
      
      {value.map((item, index) => (
        <Card key={item.id || index} className="p-4 bg-slate-700 border-slate-600">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-slate-100">
              {label.slice(0, -1)} {index + 1}
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(itemDefinition).map(([fieldKey, fieldDef]) => {
              // Check dependencies
              const isVisible = fieldDef.dependencies
                ? fieldDef.dependencies.condition(item[fieldDef.dependencies.field])
                : true;

              if (!isVisible) return null;

              return (
                <div key={fieldKey}>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    {fieldDef.label}
                    {fieldDef.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(item, index, fieldKey, fieldDef)}
                </div>
              );
            })}
          </div>
        </Card>
      ))}
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={addItem}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Simple Image Upload Component (URL-based for now)
export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  error
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="space-y-2">
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter image URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {value && (
          <div className="mt-2">
            <img
              src={value}
              alt={label}
              className="max-w-xs max-h-32 object-cover rounded border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
