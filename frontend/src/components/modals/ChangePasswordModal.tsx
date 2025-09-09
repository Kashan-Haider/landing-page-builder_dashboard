import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        setError(data.message || 'Failed to change password');
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
            Change Password
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
              Current Password
            </label>
            <input
              type="password"
              required
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)',
              }}
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              New Password
            </label>
            <input
              type="password"
              required
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)',
              }}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)',
              }}
              placeholder="Confirm new password"
            />
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

          {success && (
            <div 
              className="p-3 rounded-lg border text-sm"
              style={{ 
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                borderColor: 'var(--success)',
                color: 'var(--success)'
              }}
            >
              Password changed successfully!
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
              disabled={loading || success}
              className="flex-1 py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              style={{ 
                backgroundColor: loading ? 'var(--metallic-dark)' : success ? 'var(--success)' : 'var(--accent-primary)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if (!loading && !success) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && !success) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                }
              }}
            >
              {loading ? 'Changing...' : success ? 'Changed!' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
