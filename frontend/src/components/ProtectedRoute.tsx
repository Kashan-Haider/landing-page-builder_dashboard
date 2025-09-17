import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'EMPLOYEE' | ('ADMIN' | 'EMPLOYEE')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading, redirectToRoleBasedLogin } = useAuth();

  console.log('ProtectedRoute - Auth state:', { isAuthenticated, user: user?.role, loading, requiredRole });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent-primary)' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to appropriate login
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    const roleForRedirect = Array.isArray(requiredRole) ? requiredRole[0] : requiredRole;
    redirectToRoleBasedLogin(roleForRedirect);
    return null;
  }

  // If authenticated but wrong role, redirect to appropriate login
  if (requiredRole && user?.role) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(user.role)) {
      console.log(`Wrong role: user has ${user?.role}, required ${requiredRole}`);
      redirectToRoleBasedLogin(user?.role);
      return null;
    }
  }

  console.log('Access granted - user authenticated with correct role');
  // User is authenticated and has correct role
  return <>{children}</>;
};

export default ProtectedRoute;
