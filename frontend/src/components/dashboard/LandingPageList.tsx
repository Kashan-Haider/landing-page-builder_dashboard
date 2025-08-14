import React from 'react';
import type { LandingPage } from '../../types/landingPageDataTypes';

interface LandingPageListProps {
  pages: LandingPage[];
  selectedPage: LandingPage | null;
  onPageSelect: (page: LandingPage) => void;
}

export const LandingPageList: React.FC<LandingPageListProps> = ({ 
  pages, 
  selectedPage, 
  onPageSelect 
}) => {
  if (pages.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-100">
              Landing Pages
            </h3>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              0
            </span>
          </div>
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-slate-600 mb-4"
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
            <p className="text-slate-400 text-sm">No landing pages found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-100">
            Landing Pages
          </h3>
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {pages.length}
          </span>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 group ${
                selectedPage?.id === page.id
                  ? "bg-blue-600 border border-blue-500 shadow-lg"
                  : "bg-slate-700 hover:bg-slate-600 border border-slate-600"
              }`}
              onClick={() => onPageSelect(page)}
            >
              <div
                className={`font-medium text-sm truncate mb-2 ${
                  selectedPage?.id === page.id
                    ? "text-white"
                    : "text-slate-100"
                }`}
              >
                {page.businessName}
              </div>
              <div
                className={`text-xs truncate mb-1 ${
                  selectedPage?.id === page.id
                    ? "text-blue-100"
                    : "text-slate-400"
                }`}
              >
                ID: {page.id.substring(0, 8)}...
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${
                  selectedPage?.id === page.id
                    ? "text-blue-200"
                    : "text-slate-500"
                }`}
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
