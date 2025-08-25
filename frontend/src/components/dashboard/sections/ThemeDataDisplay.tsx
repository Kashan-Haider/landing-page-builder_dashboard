import React from "react";
import type { LandingPage } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";

interface ThemeDataDisplayProps {
  themeData: LandingPage["themeData"];
}

const ColorPreview: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div>
    <FieldDisplay label={label} value={color} />
    {color && (
      <div className="mt-2 flex items-center gap-2">
        <div
          className="w-8 h-8 rounded border"
          style={{
            backgroundColor: color,
            borderColor: "var(--border-secondary)",
          }}
        />
        <span style={{ color: "var(--text-muted)" }} className="text-sm">
          Color Preview
        </span>
      </div>
    )}
  </div>
);

export const ThemeDataDisplay: React.FC<ThemeDataDisplayProps> = ({ themeData }) => {
  if (!themeData) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-pink-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        Theme Data
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ColorPreview color={themeData.primaryColor} label="Primary Color" />
        <ColorPreview color={themeData.secondaryColor} label="Secondary Color" />
        <div className="md:col-span-2">
          <FieldDisplay label="Font Family" value={themeData.fontFamily} />
        </div>
        <div className="md:col-span-2">
          <FieldDisplay label="Logo URL" value={themeData.logoUrl} />
        </div>
      </div>
    </div>
  );
};
