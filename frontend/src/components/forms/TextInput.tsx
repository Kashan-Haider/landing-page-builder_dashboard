import React from "react";

interface TextInputProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  type?: "text" | "email" | "tel" | "url";
}

export const TextInput: React.FC<TextInputProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  multiline = false,
  required = false,
  type = "text"
}) => {
  const Component = multiline ? "textarea" : "input";
  
  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-medium"
        style={{ color: "var(--text-tertiary)" }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <Component
        type={multiline ? undefined : type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 metallic-bg rounded-lg border transition-all duration-300 outline-none ${
          multiline ? "min-h-[100px] resize-y" : ""
        }`}
        style={{
          color: "var(--text-primary)",
          borderColor: "var(--border-secondary)",
          backgroundColor: "var(--bg-secondary)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent-primary)";
          e.target.style.boxShadow = "0 0 0 3px rgba(124, 156, 196, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border-secondary)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
};
