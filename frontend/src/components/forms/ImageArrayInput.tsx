import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface ImageArrayInputProps {
  label: string;
  value: any[] | undefined;
  onChange: (value: any[]) => void;
}

export const ImageArrayInput: React.FC<ImageArrayInputProps> = ({ 
  label, 
  value = [], 
  onChange 
}) => {
  const addImage = () => {
    onChange([
      ...value,
      {
        slotName: "",
        title: "",
        altText: "",
        imageUrl: "",
        category: "",
      },
    ]);
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, field: string, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={addImage}
          className="flex items-center space-x-2 px-3 py-1 text-sm rounded-md transition-colors"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "var(--text-on-accent)",
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      <div className="space-y-3">
        {value.map((image, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border space-y-3"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-secondary)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Image {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                  Slot Name
                </label>
                <input
                  type="text"
                  value={image.slotName || ""}
                  onChange={(e) => updateImage(index, "slotName", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={image.title || ""}
                  onChange={(e) => updateImage(index, "title", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                  Alt Text
                </label>
                <input
                  type="text"
                  value={image.altText || ""}
                  onChange={(e) => updateImage(index, "altText", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                  Category
                </label>
                <input
                  type="text"
                  value={image.category || ""}
                  onChange={(e) => updateImage(index, "category", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                  Image URL
                </label>
                <input
                  type="url"
                  value={image.imageUrl || ""}
                  onChange={(e) => updateImage(index, "imageUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {value.length === 0 && (
        <div
          className="text-center py-8 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          No images added yet. Click "Add Image" to get started.
        </div>
      )}
    </div>
  );
};
