import React from "react";
import type { LandingPage } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";
import { ContentSectionRenderer } from "../../content/ContentSectionRenderer";

interface ContentDisplayProps {
  content: LandingPage["content"];
}

const HeroSection: React.FC<{ hero: NonNullable<LandingPage["content"]>["hero"] }> = ({ hero }) => {
  if (!hero) return null;

  return (
    <div>
      <h5 className="text-sm font-medium mb-3 silver-text uppercase tracking-wider">
        Hero Section
      </h5>
      <div className="card-metallic p-4">
        <div className="space-y-4">
          <FieldDisplay label="Title" value={hero.title} />
          <FieldDisplay label="Subtitle" value={hero.subtitle} />
          <FieldDisplay label="Description" value={hero.description} />
          {hero.ctaButtons && hero.ctaButtons.length > 0 && (
            <div className="mt-4">
              <span
                style={{ color: "var(--text-tertiary)" }}
                className="text-sm font-medium"
              >
                CTA Buttons:
              </span>
              <div className="mt-2 space-y-2">
                {hero.ctaButtons.map((cta, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--bg-quaternary)" }}
                  >
                    <span
                      style={{ color: "var(--text-primary)" }}
                      className="font-medium"
                    >
                      {cta.label}
                    </span>
                    <span style={{ color: "var(--text-muted)" }}>→</span>
                    <span style={{ color: "var(--accent-primary)" }}>
                      {cta.href}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        cta.style === "primary" ? "btn-metallic" : ""
                      }`}
                      style={{
                        backgroundColor:
                          cta.style === "primary"
                            ? "var(--accent-primary)"
                            : "var(--bg-tertiary)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {cta.style}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Page Content
      </h4>
      <div className="space-y-6">
        <HeroSection hero={content.hero} />
        {/* Other Content Sections */}
        {Object.entries(content)
          .filter(([key]) => key !== "hero")
          .map(([sectionKey, sectionValue]) => {
            if (!sectionValue || typeof sectionValue !== "object") return null;

            return (
              <div key={sectionKey}>
                <ContentSectionRenderer
                  sectionKey={sectionKey}
                  sectionValue={sectionValue}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
