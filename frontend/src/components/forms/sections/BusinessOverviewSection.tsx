import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";
import type { BusinessOverviewContent } from "../../../types/landingPageDataTypes";

interface BusinessOverviewSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const BusinessOverviewSection: React.FC<
  BusinessOverviewSectionProps
> = ({ formData, updateFormData }) => {
  const businessOverviewContent: BusinessOverviewContent[] =
    getNestedValue(formData, "content.businessOverview.content") || [];

  const addBusinessOverviewItem = () => {
    const newItem: BusinessOverviewContent = {
      heading: "",
      description: "",
      ctaButton: {
        label: "",
        href: "",
      },
    };

    const updatedContent = [...businessOverviewContent, newItem];
    updateFormData("content.businessOverview.content", updatedContent);
  };

  const removeBusinessOverviewItem = (index: number) => {
    const updatedContent = businessOverviewContent.filter(
      (_, i) => i !== index
    );
    updateFormData("content.businessOverview.content", updatedContent);
  };

  const updateBusinessOverviewItem = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedContent = [...businessOverviewContent];

    if (field.startsWith("ctaButton.")) {
      const ctaField = field.split(".")[1];
      updatedContent[index] = {
        ...updatedContent[index],
        ctaButton: {
          ...updatedContent[index].ctaButton,
          [ctaField]: value,
        },
      };
    } else {
      updatedContent[index] = {
        ...updatedContent[index],
        [field]: value,
      };
    }

    updateFormData("content.businessOverview.content", updatedContent);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Business Overview Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Highlight key business information and offerings. Each item includes a
          heading, description, and call-to-action button.
        </p>
      </div>

      {/* Business Overview Items */}
      <div className="space-y-6">
        {businessOverviewContent.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 space-y-4"
            style={{ borderColor: "var(--border-primary)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h4
                className="text-md font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Business Overview Item #{index + 1}
              </h4>
              <button
                onClick={() => removeBusinessOverviewItem(index)}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg transition-colors"
                title="Remove this item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <TextInput
                label="Heading"
                value={item.heading}
                onChange={(value) =>
                  updateBusinessOverviewItem(index, "heading", value)
                }
                placeholder="Key business highlight or service"
                required
              />

              <TextInput
                label="Description"
                value={item.description}
                onChange={(value) =>
                  updateBusinessOverviewItem(index, "description", value)
                }
                placeholder="Detailed description of this business aspect..."
                multiline
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="CTA Button Label"
                  value={item.ctaButton.label}
                  onChange={(value) =>
                    updateBusinessOverviewItem(index, "ctaButton.label", value)
                  }
                  placeholder="Learn More"
                  required
                />

                <TextInput
                  label="CTA Button URL"
                  value={item.ctaButton.href}
                  onChange={(value) =>
                    updateBusinessOverviewItem(index, "ctaButton.href", value)
                  }
                  placeholder="https://example.com/learn-more"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add New Item Button */}
        <button
          onClick={addBusinessOverviewItem}
          className="w-full border-2 border-dashed rounded-lg p-6 flex items-center justify-center space-x-2 transition-colors hover:bg-opacity-50"
          style={{
            borderColor: "var(--border-secondary)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Add Business Overview Item</span>
        </button>

        {businessOverviewContent.length === 0 && (
          <div
            className="text-center p-8 rounded-lg"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              No business overview items yet. Click "Add Business Overview Item"
              to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
