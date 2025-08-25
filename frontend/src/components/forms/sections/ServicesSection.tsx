import React from "react";
import { TextInput } from "../TextInput";
import { ArrayInput } from "../ArrayInput";
import { getNestedValue } from "../formHelpers";
import { Plus, X } from "lucide-react";

interface ServicesSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  formData,
  updateFormData,
}) => {
  const services = getNestedValue(formData, "content.services.services") || [];

  const addService = () => {
    const newServices = [...services, {
      name: "",
      description: "",
      features: [],
      price: "",
    }];
    updateFormData("content.services.services", newServices);
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateFormData("content.services.services", newServices);
  };

  const removeService = (index: number) => {
    const newServices = services.filter((_: any, i: number) => i !== index);
    updateFormData("content.services.services", newServices);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Services Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showcase your services and what you offer
        </p>
      </div>

      <TextInput
        label="Services Title"
        value={getNestedValue(formData, "content.services.title")}
        onChange={(value) => updateFormData("content.services.title", value)}
        placeholder="Our Services"
        required
      />

      <TextInput
        label="Services Description"
        value={getNestedValue(formData, "content.services.description")}
        onChange={(value) => updateFormData("content.services.description", value)}
        placeholder="What we offer to help you succeed"
        multiline
        required
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium" style={{ color: "var(--text-secondary)" }}>
            Services
          </h4>
          <button
            type="button"
            onClick={addService}
            className="flex items-center space-x-2 px-3 py-1 text-sm rounded-md transition-colors"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--text-on-accent)",
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>

        <div className="space-y-4">
          {services.map((service: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded-lg border space-y-4"
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
                  Service {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="p-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Service Name"
                  value={service.name || ""}
                  onChange={(value) => updateService(index, "name", value)}
                  placeholder="Web Development"
                  required
                />
                <TextInput
                  label="Price"
                  value={service.price || ""}
                  onChange={(value) => updateService(index, "price", value)}
                  placeholder="$99 or Contact for quote"
                />
              </div>

              <TextInput
                label="Description"
                value={service.description || ""}
                onChange={(value) => updateService(index, "description", value)}
                placeholder="Detailed description of the service"
                multiline
                required
              />

              <ArrayInput
                label="Features"
                value={service.features || []}
                onChange={(value) => updateService(index, "features", value)}
                placeholder="Service feature or benefit"
              />
            </div>
          ))}

          {services.length === 0 && (
            <div
              className="text-center py-8 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No services added yet. Click "Add Service" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
