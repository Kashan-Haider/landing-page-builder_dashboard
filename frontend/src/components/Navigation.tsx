import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            Landing Page Builder
          </h1>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-[var(--accent-primary)] text-white' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              Dashboard
            </Link>
            
            <Link
              to="/create"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/create') 
                  ? 'bg-[var(--accent-primary)] text-white' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              Create Page
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
