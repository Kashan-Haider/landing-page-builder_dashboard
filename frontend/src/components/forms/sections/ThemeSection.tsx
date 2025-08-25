import React from "react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";

interface ThemeSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Theme & Design
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Customize the visual appearance of your page
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            Primary Color
          </label>
          <input
            type="color"
            value={getNestedValue(formData, "themeData.primaryColor") || "#3B82F6"}
            onChange={(e) => updateFormData("themeData.primaryColor", e.target.value)}
            className="w-full h-12 rounded-lg border cursor-pointer"
            style={{ borderColor: "var(--border-secondary)" }}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            Secondary Color
          </label>
          <input
            type="color"
            value={getNestedValue(formData, "themeData.secondaryColor") || "#1E40AF"}
            onChange={(e) => updateFormData("themeData.secondaryColor", e.target.value)}
            className="w-full h-12 rounded-lg border cursor-pointer"
            style={{ borderColor: "var(--border-secondary)" }}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            Accent Color
          </label>
          <input
            type="color"
            value={getNestedValue(formData, "themeData.accentColor") || "#F59E0B"}
            onChange={(e) => updateFormData("themeData.accentColor", e.target.value)}
            className="w-full h-12 rounded-lg border cursor-pointer"
            style={{ borderColor: "var(--border-secondary)" }}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          Font Family
        </label>
        <select
          value={getNestedValue(formData, "themeData.fontFamily") || "Inter"}
          onChange={(e) => updateFormData("themeData.fontFamily", e.target.value)}
          className="w-full px-4 py-3 metallic-bg rounded-lg border transition-all duration-300 outline-none"
          style={{
            color: "var(--text-primary)",
            borderColor: "var(--border-secondary)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Poppins">Poppins</option>
        </select>
      </div>

      <TextInput
        label="Logo URL"
        value={getNestedValue(formData, "themeData.logoUrl")}
        onChange={(value) => updateFormData("themeData.logoUrl", value)}
        placeholder="https://example.com/logo.png"
        type="url"
      />
    </div>
  );
};
