import React from "react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";

interface BusinessDataSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const BusinessDataSection: React.FC<BusinessDataSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Business Information
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Contact details and business information
        </p>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4" style={{ color: "var(--text-secondary)" }}>
          Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Phone"
            value={getNestedValue(formData, "businessData.phone")}
            onChange={(value) => updateFormData("businessData.phone", value)}
            placeholder="+1 (555) 123-4567"
            type="tel"
            required
          />
          <TextInput
            label="Email"
            value={getNestedValue(formData, "businessData.email")}
            onChange={(value) => updateFormData("businessData.email", value)}
            placeholder="contact@business.com"
            type="email"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Emergency Phone"
            value={getNestedValue(formData, "businessData.emergencyPhone")}
            onChange={(value) => updateFormData("businessData.emergencyPhone", value)}
            placeholder="+1 (555) 999-0000"
            type="tel"
          />
          <TextInput
            label="Emergency Email"
            value={getNestedValue(formData, "businessData.emergencyEmail")}
            onChange={(value) => updateFormData("businessData.emergencyEmail", value)}
            placeholder="emergency@business.com"
            type="email"
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4" style={{ color: "var(--text-secondary)" }}>
          Address
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Street"
            value={getNestedValue(formData, "businessData.address.street")}
            onChange={(value) => updateFormData("businessData.address.street", value)}
            placeholder="123 Main Street"
            required
          />
          <TextInput
            label="City"
            value={getNestedValue(formData, "businessData.address.city")}
            onChange={(value) => updateFormData("businessData.address.city", value)}
            placeholder="New York"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput
            label="State"
            value={getNestedValue(formData, "businessData.address.state")}
            onChange={(value) => updateFormData("businessData.address.state", value)}
            placeholder="NY"
            required
          />
          <TextInput
            label="ZIP Code"
            value={getNestedValue(formData, "businessData.address.zipCode")}
            onChange={(value) => updateFormData("businessData.address.zipCode", value)}
            placeholder="10001"
            required
          />
          <TextInput
            label="Country"
            value={getNestedValue(formData, "businessData.address.country")}
            onChange={(value) => updateFormData("businessData.address.country", value)}
            placeholder="US"
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4" style={{ color: "var(--text-secondary)" }}>
          Business Hours
        </h4>
        <TextInput
          label="Timezone"
          value={getNestedValue(formData, "businessData.hours.timezone")}
          onChange={(value) => updateFormData("businessData.hours.timezone", value)}
          placeholder="America/New_York"
        />
      </div>
    </div>
  );
};
