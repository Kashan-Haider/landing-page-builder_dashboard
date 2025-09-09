import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  redirectToRoleBasedLogin: (requiredRole?: 'ADMIN' | 'EMPLOYEE' | 'CLIENT') => void;
  verifyToken: (token: string) => Promise<{ isValid: boolean; shouldClear: boolean }>;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });
  const navigate = useNavigate();

  // Verify token with backend
  const verifyToken = useCallback(async (token: string): Promise<{ isValid: boolean; shouldClear: boolean }> => {
    try {
      // Check if token exists and is not empty
      if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
        console.error('Invalid token format:', token);
        return { isValid: false, shouldClear: true };
      }

      console.log('Verifying token:', token.substring(0, 20) + '...');
      
      const response = await fetch('http://localhost:3000/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token verification failed:', errorData);
        
        // If token is malformed, indicate it should be cleared
        if (errorData.error === 'JWT malformed' || errorData.message?.includes('jwt malformed')) {
          console.log('JWT malformed detected');
          return { isValid: false, shouldClear: true };
        }
        return { isValid: false, shouldClear: false };
      }

      const responseData = await response.json();
      console.log('Token verification successful:', responseData);
      return { isValid: true, shouldClear: false };
    } catch (error) {
      console.error('Token verification failed:', error);
      return { isValid: false, shouldClear: false };
    }
  }, []);

  // Clear potentially corrupted tokens
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const userStr = localStorage.getItem('adminUser');

      console.log('Initializing auth with token:', token ? 'exists' : 'null');
      console.log('User data:', userStr ? 'exists' : 'null');

      if (token && userStr) {
        try {
          // Validate token format before attempting verification
          if (token === 'null' || token === 'undefined' || token.length < 10) {
            console.error('Invalid token format detected, clearing storage');
            clearAuthData();
            return;
          }

          const user = JSON.parse(userStr);
          const { isValid, shouldClear } = await verifyToken(token);

          if (isValid) {
            console.log('Setting authenticated state for user:', user);
            setAuthState({
              isAuthenticated: true,
              user,
              token,
              loading: false
            });
          } else {
            // Token is invalid, clear storage if needed
            console.log('Token validation failed, clearing storage');
            if (shouldClear) {
              clearAuthData();
            } else {
              setAuthState({
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
              });
            }
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          clearAuthData();
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false
        });
      }
    };

    initializeAuth();
  }, [verifyToken, clearAuthData]);

  // Login function
  const login = (token: string, user: User) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      token,
      loading: false
    });
  };

  // Logout function
  const logout = () => {
    clearAuthData();
  };

  // Role-based redirect function
  const redirectToRoleBasedLogin = (requiredRole?: 'ADMIN' | 'EMPLOYEE' | 'CLIENT') => {
    if (!authState.isAuthenticated) {
      // If no specific role required, redirect based on current path or default to admin
      if (!requiredRole) {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/client')) {
          navigate('/client/login');
        } else if (currentPath.includes('/employee')) {
          navigate('/employee/login');
        } else {
          navigate('/admin/login');
        }
      } else {
        // Redirect to specific role login
        switch (requiredRole) {
          case 'ADMIN':
            navigate('/admin/login');
            break;
          case 'EMPLOYEE':
            navigate('/employee/login');
            break;
          case 'CLIENT':
            navigate('/client/login');
            break;
        }
      }
    } else if (requiredRole && authState.user?.role !== requiredRole) {
      // User is authenticated but doesn't have required role
      switch (authState.user?.role) {
        case 'ADMIN':
          navigate('/admin/login');
          break;
        case 'EMPLOYEE':
          navigate('/employee/login');
          break;
        case 'CLIENT':
          navigate('/client/login');
          break;
        default:
          navigate('/admin/login');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        redirectToRoleBasedLogin,
        verifyToken,
        clearAuthData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
