import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/employee/login');
    // Force page refresh to ensure UI updates properly
    window.location.reload();
  };

  return (
    <nav className="border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Landing Page Builder
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              Dashboard
            </Link>
            {user?.role === 'ADMIN' && (
              <Link 
                to="/admin/users" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                Users
              </Link>
            )}
            
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l" style={{ borderColor: 'var(--border-primary)' }}>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {user?.email} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: 'var(--accent-primary)', 
                  color: 'var(--text-primary)' 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
