import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'CLIENT' as 'ADMIN' | 'EMPLOYEE' | 'CLIENT'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        onUserCreated();
        onClose();
        setFormData({ email: '', password: '', role: 'CLIENT' });
      } else {
        setError(data.message || 'Failed to create user');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
            Create New User
          </h2>
          <button
            onClick={onClose}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'EMPLOYEE' | 'CLIENT' })}
              className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="CLIENT">Client</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {error && (
            <div 
              className="p-3 rounded-lg border text-sm"
              style={{ 
                backgroundColor: 'rgba(248, 113, 113, 0.1)',
                borderColor: 'var(--error)',
                color: 'var(--error)'
              }}
            >
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
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
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              style={{ 
                backgroundColor: loading ? 'var(--metallic-dark)' : 'var(--accent-primary)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                }
              }}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
