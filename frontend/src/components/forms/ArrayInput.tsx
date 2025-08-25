import React from "react";
import { Plus, X } from "lucide-react";

interface ArrayInputProps {
  label: string;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({ 
  label, 
  value = [], 
  onChange, 
  placeholder 
}) => {
  const addItem = () => onChange([...value, ""]);
  
  const updateItem = (index: number, newValue: string) => {
    const newArray = [...value];
    newArray[index] = newValue;
    onChange(newArray);
  };
  
  const removeItem = (index: number) =>
    onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center space-x-1 px-3 py-1 text-sm rounded-md transition-colors"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "var(--text-on-accent)",
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 metallic-bg rounded-lg border transition-all duration-300 outline-none"
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
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 rounded-lg transition-all duration-300 text-red-400 hover:bg-red-500/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {value.length === 0 && (
        <div
          className="text-center py-4 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          No items added yet. Click "Add" to get started.
        </div>
      )}
    </div>
  );
};
