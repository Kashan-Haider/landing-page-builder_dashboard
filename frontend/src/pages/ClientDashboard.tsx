import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CreateLandingPage from './CreateLandingPage';

const ClientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/client/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-dark)' }}></div>
      
      {/* Client Navigation */}
      <nav className="relative z-20 border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Landing Page Builder
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
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
      </nav>
      
      {/* CreateLandingPage Component */}
      <div className="relative z-10">
        <CreateLandingPage />
      </div>
    </div>
  );
};

export default ClientDashboard;
