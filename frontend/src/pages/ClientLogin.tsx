import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ClientLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'CLIENT') {
        navigate('/client/dashboard');
      } else {
        // Redirect non-client users to their appropriate login
        switch (user.role) {
          case 'ADMIN':
            navigate('/admin/login');
            break;
          case 'EMPLOYEE':
            navigate('/employee/login');
            break;
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/client/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Use the auth hook to handle login
        login(data.data.token, data.data.user);
        
        // Redirect to client dashboard
        navigate('/client/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-dark)' }}></div>
      
      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Login card with metallic styling */}
        <div 
          className="rounded-xl shadow-2xl p-8 border backdrop-blur-sm"
          style={{ 
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-metallic)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                style={{ background: 'var(--gradient-metallic)' }}
              >
                <svg className="w-8 h-8" style={{ color: 'var(--silver-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Client Portal
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Access your project dashboard
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{ 
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)',
                  }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{ 
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)',
                  }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error message */}
            {error && (
              <div 
                className="text-sm text-center p-3 rounded-lg border"
                style={{ 
                  color: 'var(--error)',
                  backgroundColor: 'rgba(248, 113, 113, 0.1)',
                  borderColor: 'var(--error)'
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: loading ? 'var(--metallic-dark)' : 'var(--accent-primary)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'var(--accent-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'var(--accent-primary)';
                }
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Client project access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
