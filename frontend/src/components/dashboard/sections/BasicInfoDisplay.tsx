import React from "react";
import type { LandingPage } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";
import { StatusBadge } from "../../forms/StatusBadge";
import { formatDate } from "../../forms/formHelpers";

interface BasicInfoDisplayProps {
  page: LandingPage;
}

export const BasicInfoDisplay: React.FC<BasicInfoDisplayProps> = ({ page }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          style={{ color: "var(--accent-primary)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Basic Information
      </h4>
      <div className="space-y-4">
        <FieldDisplay label="Business Name" value={page.businessName} />
        <FieldDisplay label="Template ID" value={page.templateId} />
        <FieldDisplay label="GitHub URL" value={page.githubUrl} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <span
            style={{ color: "var(--text-tertiary)" }}
            className="text-sm font-medium"
          >
            Status:
          </span>
          <div className="mt-2">
            <StatusBadge status={page.status} />
          </div>
        </div>
        <div>
          <span
            style={{ color: "var(--text-tertiary)" }}
            className="text-sm font-medium"
          >
            Images:
          </span>
          <div
            style={{ color: "var(--text-secondary)" }}
            className="text-sm mt-1"
          >
            {page.images?.length || 0} uploaded
          </div>
        </div>
        <div>
          <span
            style={{ color: "var(--text-tertiary)" }}
            className="text-sm font-medium"
          >
            Created:
          </span>
          <div
            style={{ color: "var(--text-secondary)" }}
            className="text-sm mt-1"
          >
            {formatDate(page.createdAt)}
          </div>
        </div>
        <div>
          <span
            style={{ color: "var(--text-tertiary)" }}
            className="text-sm font-medium"
          >
            Updated:
          </span>
          <div
            style={{ color: "var(--text-secondary)" }}
            className="text-sm mt-1"
          >
            {formatDate(page.updatedAt)}
          </div>
        </div>
        {page.publishedAt && (
          <div className="md:col-span-2">
            <span
              style={{ color: "var(--text-tertiary)" }}
              className="text-sm font-medium"
            >
              Published:
            </span>
            <div
              style={{ color: "var(--text-secondary)" }}
              className="text-sm mt-1"
            >
              {formatDate(page.publishedAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
