import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";

interface ServiceAreasSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({
  formData,
  updateFormData,
}) => {
  const serviceAreas = getNestedValue(formData, "businessData.serviceAreas") || [];

  const addServiceArea = () => {
    const newArea = { city: "", region: "", description: "" };
    updateFormData("businessData.serviceAreas", [...serviceAreas, newArea]);
  };

  const removeServiceArea = (index: number) => {
    const updatedAreas = serviceAreas.filter((_: any, i: number) => i !== index);
    updateFormData("businessData.serviceAreas", updatedAreas);
  };

  const updateServiceArea = (index: number, field: string, value: string) => {
    const updatedAreas = serviceAreas.map((area: any, i: number) =>
      i === index ? { ...area, [field]: value } : area
    );
    updateFormData("businessData.serviceAreas", updatedAreas);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Service Areas
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Define the geographic areas where your business provides services
        </p>
      </div>

      <div className="space-y-4">
        {serviceAreas.map((area: any, index: number) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-4"
            style={{ borderColor: "var(--border-secondary)" }}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium" style={{ color: "var(--text-secondary)" }}>
                Service Area {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeServiceArea(index)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Remove service area"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="City"
                value={area.city}
                onChange={(value) => updateServiceArea(index, "city", value)}
                placeholder="New York"
                required
              />
              <TextInput
                label="Region/State"
                value={area.region}
                onChange={(value) => updateServiceArea(index, "region", value)}
                placeholder="NY"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                Description
              </label>
              <textarea
                value={area.description}
                onChange={(e) => updateServiceArea(index, "description", e.target.value)}
                placeholder="Describe the services available in this area..."
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-secondary)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addServiceArea}
          className="w-full p-4 border-2 border-dashed rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-50 transition-colors"
          style={{
            borderColor: "var(--border-secondary)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Add Service Area</span>
        </button>
      </div>
    </div>
  );
};
