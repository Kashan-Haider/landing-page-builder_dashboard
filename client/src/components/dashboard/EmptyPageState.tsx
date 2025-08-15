import React from 'react';

export const EmptyPageState: React.FC = () => {
  return (
    <div className="card-metallic">
      <div className="px-6 py-12 text-center">
        <div>
          <svg
            className="mx-auto h-16 w-16 mb-6"
            style={{ color: 'var(--text-muted)' }}
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
          <p className="text-xl mb-2 silver-text">
            Select a landing page to view details
          </p>
          <p style={{ color: 'var(--text-tertiary)' }}>
            Choose a landing page from the list to view and edit its configuration
          </p>
        </div>
      </div>
    </div>
  );
};
