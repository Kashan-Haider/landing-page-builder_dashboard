import React from "react";
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
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
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
            value={
              getNestedValue(formData, "themeData.primaryColor") || "#3B82F6"
            }
            onChange={(e) =>
              updateFormData("themeData.primaryColor", e.target.value)
            }
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
            value={getNestedValue(formData, "themeData.secondaryColor")}
            onChange={(e) =>
              updateFormData("themeData.secondaryColor", e.target.value)
            }
            className="w-full h-12 rounded-lg border cursor-pointer"
            style={{ borderColor: "var(--border-secondary)" }}
          />
        </div>
      </div>
    </div>
  );
};
