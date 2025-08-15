import React from 'react';
import type { LandingPage } from '../../types/landingPageDataTypes';

interface DashboardHeaderProps {
  selectedPage: LandingPage | null;
  onEdit: () => void;
  onDelete: (page: LandingPage) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  selectedPage, 
  onEdit, 
  onDelete 
}) => {
  return (
    <header className="glass-effect border-b" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold silver-text">
              Landing Page Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Manage and edit your landing pages with modern metallic design
            </p>
          </div>
          {selectedPage && (
            <div className="flex gap-3">
              <button
                onClick={() => onDelete(selectedPage)}
                className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border"
                style={{
                  backgroundColor: 'var(--error)',
                  borderColor: '#dc2626',
                  color: 'var(--text-primary)',
                  boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.2)';
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
              <button
                onClick={onEdit}
                className="btn-metallic px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Advanced Edit Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
