import React from "react";
import { TextInput } from "../TextInput";
import { CtaButtonInput } from "../CtaButtonInput";
import { getNestedValue } from "../formHelpers";

interface CtaSectionComponentProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const CtaSectionComponent: React.FC<CtaSectionComponentProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          CTA Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Create a compelling call-to-action section to encourage user engagement
        </p>
      </div>

      <TextInput
        label="Sub Heading"
        value={getNestedValue(formData, "content.ctaSection.subHeading")}
        onChange={(value) => updateFormData("content.ctaSection.subHeading", value)}
        placeholder="Ready to Get Started?"
        required
      />

      <TextInput
        label="Main Heading"
        value={getNestedValue(formData, "content.ctaSection.heading")}
        onChange={(value) => updateFormData("content.ctaSection.heading", value)}
        placeholder="Let's Work Together"
        required
      />

      <TextInput
        label="Description"
        value={getNestedValue(formData, "content.ctaSection.description")}
        onChange={(value) => updateFormData("content.ctaSection.description", value)}
        placeholder="Contact us today to discuss your project and see how we can help you achieve your goals."
        multiline
        required
      />

      <CtaButtonInput
        label="Call-to-Action Button"
        value={getNestedValue(formData, "content.ctaSection.ctaButton") || { label: "", href: "" }}
        onChange={(value) => updateFormData("content.ctaSection.ctaButton", value)}
        required
      />
    </div>
  );
};
