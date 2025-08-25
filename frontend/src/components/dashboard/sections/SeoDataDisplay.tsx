import React from "react";
import type { LandingPage } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";

interface SeoDataDisplayProps {
  seoData: LandingPage["seoData"];
}

export const SeoDataDisplay: React.FC<SeoDataDisplayProps> = ({ seoData }) => {
  if (!seoData) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        SEO Data
      </h4>
      <div className="space-y-4">
        <FieldDisplay label="Title" value={seoData.title} />
        <FieldDisplay label="Description" value={seoData.description} />
        <FieldDisplay label="Keywords" value={seoData.keywords} type="array" />
        <FieldDisplay label="Canonical URL" value={seoData.canonicalUrl} />
        <FieldDisplay label="Focused Keywords" value={seoData.focusedKeywords} type="array" />
        <FieldDisplay label="Index" value={seoData.isIndex} type="boolean" />
      </div>
    </div>
  );
};
