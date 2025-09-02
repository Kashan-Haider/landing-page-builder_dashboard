import React from "react";
import type { CompanyDetails } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";

interface CompanyDetailsDisplayProps {
  companyDetails: CompanyDetails;
}

export const CompanyDetailsDisplay: React.FC<CompanyDetailsDisplayProps> = ({
  companyDetails,
}) => {
  if (!companyDetails?.sections || companyDetails.sections.length === 0) {
    return (
      <div className="space-y-4">
        <h4
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Company Details
        </h4>
        <p
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          No company details sections configured.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4
        className="text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Company Details
      </h4>
      
      <div className="space-y-4">
        {companyDetails.sections.map((section, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 space-y-3"
            style={{ borderColor: "var(--border-primary)" }}
          >
            <div className="flex items-center justify-between">
              <h5
                className="font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Section #{index + 1}
              </h5>
            </div>
            
            <div className="space-y-3">
              <FieldDisplay 
                label="Heading" 
                value={section.heading || "No heading"} 
              />
              <FieldDisplay 
                label="Description" 
                value={section.description || "No description"} 
                type="textarea" 
              />
            </div>
          </div>
        ))}
      </div>
      
      <div
        className="text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        Total sections: {companyDetails.sections.length}
      </div>
    </div>
  );
};
