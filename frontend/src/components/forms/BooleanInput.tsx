import React from "react";

interface BooleanInputProps {
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  description?: string;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({ 
  label, 
  value = false, 
  onChange, 
  description 
}) => {
  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-medium"
        style={{ color: "var(--text-tertiary)" }}
      >
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 metallic-bg rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/30 transition-all duration-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-md border"
            style={{
              borderColor: "var(--border-secondary)",
              backgroundColor: value
                ? "var(--accent-primary)"
                : "var(--bg-secondary)",
            }}
          />
        </label>
        <span
          className="text-sm font-medium select-none"
          style={{ color: "var(--text-secondary)" }}
        >
          {value ? "Enabled" : "Disabled"}
        </span>
      </div>
      {description && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      )}
    </div>
  );
};
