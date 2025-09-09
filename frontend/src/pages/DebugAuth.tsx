import React from 'react';
import { useAuth } from '../hooks/useAuth';

const DebugAuth: React.FC = () => {
  const { token, user, isAuthenticated, clearAuthData } = useAuth();

  const handleClearStorage = () => {
    clearAuthData();
    alert('Auth data cleared! Please try logging in again.');
  };

  const checkLocalStorage = () => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    console.log('Raw token from localStorage:', storedToken);
    console.log('Raw user from localStorage:', storedUser);
    
    if (storedToken) {
      console.log('Token length:', storedToken.length);
      console.log('Token first 50 chars:', storedToken.substring(0, 50));
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1a1a1a', 
      color: '#ffffff', 
      minHeight: '100vh' 
    }}>
      <h1>Authentication Debug Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Auth State:</h3>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>Token exists: {token ? 'Yes' : 'No'}</p>
        <p>User: {user ? JSON.stringify(user, null, 2) : 'None'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkLocalStorage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Check LocalStorage (Console)
        </button>
        
        <button 
          onClick={handleClearStorage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Auth Data
        </button>
      </div>

      <div>
        <p>If you're experiencing JWT malformed errors:</p>
        <ol>
          <li>Click "Check LocalStorage" and check browser console</li>
          <li>Click "Clear Auth Data" to remove corrupted tokens</li>
          <li>Try logging in again</li>
        </ol>
      </div>
    </div>
  );
};

export default DebugAuth;
