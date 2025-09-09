import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface ServiceHighlightsSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const ServiceHighlightsSection: React.FC<ServiceHighlightsSectionProps> = ({
  formData,
  updateFormData,
}) => {
  const serviceHighlights = formData.content?.serviceHighlights || {
    title: "",
    description: "",
    services: [],
  };

  const addService = () => {
    const newServices = [
      ...serviceHighlights.services,
      { name: "", description: "" },
    ];
    updateFormData("content.serviceHighlights.services", newServices);
  };

  const removeService = (index: number) => {
    const newServices = serviceHighlights.services.filter((_: any, i: number) => i !== index);
    updateFormData("content.serviceHighlights.services", newServices);
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...serviceHighlights.services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateFormData("content.serviceHighlights.services", newServices);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Service Highlights Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showcase your key services with brief highlights
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
          Section Title
        </label>
        <input
          type="text"
          value={serviceHighlights.title}
          onChange={(e) => updateFormData("content.serviceHighlights.title", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-primary)",
            color: "var(--text-primary)",
          }}
          placeholder="Our Key Services"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
          Section Description
        </label>
        <textarea
          value={serviceHighlights.description}
          onChange={(e) => updateFormData("content.serviceHighlights.description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-primary)",
            color: "var(--text-primary)",
          }}
          placeholder="Brief overview of your service highlights..."
        />
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Service Highlights
          </label>
          <button
            type="button"
            onClick={addService}
            className="btn-metallic px-3 py-1 rounded-lg flex items-center space-x-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>

        <div className="space-y-4">
          {serviceHighlights.services.map((service: any, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-3"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
              }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Service {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                  Service Name
                </label>
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => updateService(index, "name", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-secondary)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Service name..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                  Service Description
                </label>
                <textarea
                  value={service.description}
                  onChange={(e) => updateService(index, "description", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-secondary)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Brief description of this service..."
                />
              </div>
            </div>
          ))}

          {serviceHighlights.services.length === 0 && (
            <div
              className="text-center py-8 border-2 border-dashed rounded-lg"
              style={{ borderColor: "var(--border-secondary)" }}
            >
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                No service highlights added yet. Click "Add Service" to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
