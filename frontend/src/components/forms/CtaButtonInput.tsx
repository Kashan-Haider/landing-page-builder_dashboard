import React from "react";
import { TextInput } from "./TextInput";

interface CtaButton {
  label: string;
  href: string;
}

interface CtaButtonInputProps {
  label: string;
  value: CtaButton;
  onChange: (value: CtaButton) => void;
  required?: boolean;
}

export const CtaButtonInput: React.FC<CtaButtonInputProps> = ({
  label,
  value = { label: "", href: "" },
  onChange,
  required = false,
}) => {
  const updateField = (field: keyof CtaButton, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="space-y-4">
      <h5 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Button Text"
          value={value.label}
          onChange={(fieldValue) => updateField("label", fieldValue)}
          placeholder="Get Started"
          required={required}
        />
        <TextInput
          label="Button Link"
          value={value.href}
          onChange={(fieldValue) => updateField("href", fieldValue)}
          placeholder="https://example.com or /contact"
          required={required}
        />
      </div>
    </div>
  );
};
