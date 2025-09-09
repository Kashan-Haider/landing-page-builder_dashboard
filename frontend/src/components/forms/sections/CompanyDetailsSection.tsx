import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";
import type { CompanyDetailsSection as CompanyDetailsSectionType } from "../../../types/landingPageDataTypes";

interface CompanyDetailsSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const CompanyDetailsSection: React.FC<CompanyDetailsSectionProps> = ({
  formData,
  updateFormData,
}) => {
  const companyDetailsSections: CompanyDetailsSectionType[] =
    getNestedValue(formData, "content.companyDetails.sections") || [];
  
  const companyDetailsHeading = getNestedValue(formData, "content.companyDetails.heading") || "";
  const companyDetailsDescription = getNestedValue(formData, "content.companyDetails.description") || "";

  const addCompanyDetailsItem = () => {
    const newItem: CompanyDetailsSectionType = {
      heading: "",
      description: "",
    };

    const updatedSections = [...companyDetailsSections, newItem];
    updateFormData("content.companyDetails.sections", updatedSections);
  };

  const removeCompanyDetailsItem = (index: number) => {
    const updatedSections = companyDetailsSections.filter((_, i) => i !== index);
    updateFormData("content.companyDetails.sections", updatedSections);
  };

  const updateCompanyDetailsItem = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSections = [...companyDetailsSections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value,
    };
    updateFormData("content.companyDetails.sections", updatedSections);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Company Details Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Configure the main heading and description for your company details section,
          then add individual detail items to showcase different aspects of your business.
        </p>
      </div>

      {/* Main Company Details Section Fields */}
      <div className="space-y-4 mb-8 p-6 border rounded-lg" style={{ borderColor: "var(--border-primary)", backgroundColor: "var(--bg-secondary)" }}>
        <h4 className="text-md font-medium mb-4" style={{ color: "var(--text-primary)" }}>
          Section Header
        </h4>
        
        <TextInput
          label="Section Heading"
          value={companyDetailsHeading}
          onChange={(value) => updateFormData("content.companyDetails.heading", value)}
          placeholder="Company Details (e.g., About Our Company, Why Choose Us)"
          required
        />
        
        <TextInput
          label="Section Description"
          value={companyDetailsDescription}
          onChange={(value) => updateFormData("content.companyDetails.description", value)}
          placeholder="Brief introduction to your company details section..."
          multiline
          required
        />
      </div>

      {/* Company Details Items */}
      <div className="space-y-6">
        {companyDetailsSections.map((item, index) => (
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
                Company Details Item #{index + 1}
              </h4>
              <button
                onClick={() => removeCompanyDetailsItem(index)}
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
                  updateCompanyDetailsItem(index, "heading", value)
                }
                placeholder="Company detail heading (e.g., Our Mission, Our Values)"
                required
              />

              <TextInput
                label="Description"
                value={item.description}
                onChange={(value) =>
                  updateCompanyDetailsItem(index, "description", value)
                }
                placeholder="Detailed description of this company aspect..."
                multiline
                required
              />
            </div>
          </div>
        ))}

        {/* Add New Item Button */}
        <button
          onClick={addCompanyDetailsItem}
          className="w-full border-2 border-dashed rounded-lg p-6 flex items-center justify-center space-x-2 transition-colors hover:bg-opacity-50"
          style={{
            borderColor: "var(--border-secondary)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Add Company Details Item</span>
        </button>

        {companyDetailsSections.length === 0 && (
          <div
            className="text-center p-8 rounded-lg"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              No company details sections yet. Click "Add Company Details Item"
              to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
