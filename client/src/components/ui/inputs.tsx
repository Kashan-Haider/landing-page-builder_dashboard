import React from 'react';

interface BaseInputProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface TextInputProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'url' | 'number';
}

interface TextAreaInputProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectInputProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

interface CheckboxInputProps extends BaseInputProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface ColorPickerProps extends BaseInputProps {
  value: string;
  onChange: (color: string) => void;
}

// Base label and error components
const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ 
  children, 
  required 
}) => (
  <label className="block text-sm font-medium text-slate-200 mb-2">
    {children}
    {required && <span className="text-red-400 ml-1">*</span>}
  </label>
);

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) => {
  if (!error) return null;
  return <p className="mt-1 text-sm text-red-400">{error}</p>;
};

// Text Input Component
export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  required,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label required={required}>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''
        }`}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

// Textarea Component
export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  error,
  required,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label required={required}>{label}</Label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
          error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''
        }`}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

// Select Component
export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  required,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label required={required}>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
};

// Checkbox Component
export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onChange,
  error,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 bg-slate-700 rounded"
        />
        <label className="ml-2 block text-sm text-slate-200">
          {label}
        </label>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

// Color Picker Component
export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  error,
  required,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label required={required}>{label}</Label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-20 border border-slate-600 bg-slate-700 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className={`flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''
          }`}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

// Button Component
export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500',
    outline: 'border border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-blue-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// Card Component
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800 shadow-xl rounded-xl border border-slate-700 ${className}`}>
      {children}
    </div>
  );
};
