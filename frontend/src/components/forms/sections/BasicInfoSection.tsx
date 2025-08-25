import React from "react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";

interface BasicInfoSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Basic Information
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Essential details about your landing page
        </p>
      </div>

      <TextInput
        label="Business Name"
        value={getNestedValue(formData, "businessName")}
        onChange={(value) => updateFormData("businessName", value)}
        placeholder="Your business or organization name"
        required
      />

      <TextInput
        label="Template ID"
        value={getNestedValue(formData, "templateId")}
        onChange={(value) => updateFormData("templateId", value)}
        placeholder="template-id-from-github"
        required
      />

      <TextInput
        label="GitHub URL"
        value={getNestedValue(formData, "githubUrl")}
        onChange={(value) => updateFormData("githubUrl", value)}
        placeholder="https://github.com/username/repo"
        type="url"
      />
    </div>
  );
};
