import React from "react";
import { TextInput } from "../TextInput";
import { ArrayInput } from "../ArrayInput";
import { BooleanInput } from "../BooleanInput";
import { getNestedValue } from "../formHelpers";

interface SeoSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const SeoSection: React.FC<SeoSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          SEO Settings
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Optimize your page for search engines
        </p>
      </div>

      <TextInput
        label="Page Title"
        value={getNestedValue(formData, "seoData.title")}
        onChange={(value) => updateFormData("seoData.title", value)}
        placeholder="Your page title for search engines"
      />

      <TextInput
        label="Meta Description"
        value={getNestedValue(formData, "seoData.description")}
        onChange={(value) => updateFormData("seoData.description", value)}
        placeholder="Brief description for search results"
        multiline
      />

      <ArrayInput
        label="Keywords"
        value={getNestedValue(formData, "seoData.keywords")}
        onChange={(value) => updateFormData("seoData.keywords", value)}
        placeholder="SEO keyword"
      />

      <TextInput
        label="Canonical URL"
        value={getNestedValue(formData, "seoData.canonicalUrl")}
        onChange={(value) => updateFormData("seoData.canonicalUrl", value)}
        placeholder="https://yourdomain.com/page"
        type="url"
      />

      <ArrayInput
        label="Focused Keywords"
        value={getNestedValue(formData, "seoData.focusedKeywords")}
        onChange={(value) => updateFormData("seoData.focusedKeywords", value)}
        placeholder="Primary SEO keyword"
      />

      <BooleanInput
        label="Index in Search Engines"
        value={getNestedValue(formData, "seoData.isIndex")}
        onChange={(value) => updateFormData("seoData.isIndex", value)}
        description="Allow search engines to index this page"
      />
    </div>
  );
};
