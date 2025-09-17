import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
  createdAt: string;
  updatedAt: string;
}

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserDeleted: () => void;
  user: User | null;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onUserDeleted, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const { token } = useAuth();

  const handleDelete = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      console.log('Deleting user:', user.id);
      
      const response = await fetch(`http://localhost:3000/api/auth/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Delete user response:', data);
      
      if (data.success) {
        onUserDeleted();
        onClose();
        setConfirmText('');
      } else {
        setError(data.message || data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Delete user error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmText('');
    setError('');
    onClose();
  };

  const isConfirmValid = confirmText === 'DELETE';

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div 
        className="w-full max-w-md rounded-xl border p-6"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-metallic)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Delete User
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Section */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg border mb-6"
          style={{ 
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            borderColor: 'var(--error)',
          }}
        >
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--error)' }} />
          <div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--error)' }}>
              Permanent Action
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              This action cannot be undone. This will permanently delete the user account and remove all associated data.
            </p>
          </div>
        </div>

        {/* User Info */}
        <div 
          className="p-4 rounded-lg border mb-6"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-primary)'
          }}
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Email:
              </span>
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {user.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Role:
              </span>
              <span 
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ 
                  backgroundColor: user.role === 'ADMIN' ? 'rgba(239, 68, 68, 0.2)' : 
                                   user.role === 'EMPLOYEE' ? 'rgba(245, 158, 11, 0.2)' : 
                                   'rgba(59, 130, 246, 0.2)',
                  color: user.role === 'ADMIN' ? '#ef4444' : 
                         user.role === 'EMPLOYEE' ? '#f59e0b' : 
                         '#3b82f6'
                }}
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Type <span className="font-bold" style={{ color: 'var(--error)' }}>DELETE</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-primary)',
              color: 'var(--text-primary)'
            }}
            placeholder="Type DELETE to confirm"
          />
        </div>

        {error && (
          <div 
            className="p-3 rounded-lg border text-sm mb-4"
            style={{ 
              backgroundColor: 'rgba(248, 113, 113, 0.1)',
              borderColor: 'var(--error)',
              color: 'var(--error)'
            }}
          >
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2 px-4 rounded-lg border transition-colors"
            style={{ 
              borderColor: 'var(--border-primary)',
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading || !isConfirmValid}
            className="flex-1 py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: loading || !isConfirmValid ? 'var(--metallic-dark)' : 'var(--error)',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              if (!loading && isConfirmValid) {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && isConfirmValid) {
                e.currentTarget.style.backgroundColor = 'var(--error)';
              }
            }}
          >
            {loading ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
