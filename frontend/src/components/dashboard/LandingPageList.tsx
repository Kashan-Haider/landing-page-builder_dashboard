import React from "react";
import type { LandingPage } from "../../types/landingPageDataTypes";

interface LandingPageListProps {
  pages: LandingPage[];
  selectedPage: LandingPage | null;
  onPageSelect: (page: LandingPage) => void;
}

export const LandingPageList: React.FC<LandingPageListProps> = ({
  pages,
  selectedPage,
  onPageSelect,
}) => {
  console.log(selectedPage);
  if (pages.length === 0) {
    return (
      <div className="card-metallic">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold silver-text">Landing Pages</h3>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "var(--text-primary)",
              }}
            >
              0
            </span>
          </div>
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              style={{ color: "var(--text-muted)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No landing pages found
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-metallic">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold silver-text">Landing Pages</h3>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--text-primary)",
            }}
          >
            {pages.length}
          </span>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 group border ${
                selectedPage?.id === page.id
                  ? "btn-metallic shadow-lg"
                  : "metallic-bg hover:shadow-md"
              }`}
              style={{
                borderColor:
                  selectedPage?.id === page.id
                    ? "var(--accent-primary)"
                    : "var(--border-secondary)",
                transform:
                  selectedPage?.id === page.id ? "translateY(-1px)" : "none",
              }}
              onClick={() => onPageSelect(page)}
            >
              <div
                className="font-medium text-sm truncate mb-2"
                style={{
                  color:
                    selectedPage?.id === page.id
                      ? "var(--text-primary)"
                      : "var(--text-primary)",
                }}
              >
                {page.businessName}
              </div>
              <div
                className="text-xs truncate mb-1"
                style={{
                  color:
                    selectedPage?.id === page.id
                      ? "var(--text-secondary)"
                      : "var(--text-tertiary)",
                }}
              >
                ID: {page.id.substring(0, 8)}...
              </div>
              <div
                className="text-xs flex items-center gap-1"
                style={{
                  color:
                    selectedPage?.id === page.id
                      ? "var(--text-secondary)"
                      : "var(--text-muted)",
                }}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                {page.templateId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
