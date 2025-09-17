import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Plus, Edit, Trash2, Key, Shield } from 'lucide-react';
import CreateUserModal from '../components/modals/CreateUserModal';
import EditUserModal from '../components/modals/EditUserModal';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import DeleteUserModal from '../components/modals/DeleteUserModal';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
  createdAt: string;
  updatedAt: string;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { token, isAuthenticated, redirectToRoleBasedLogin } = useAuth();

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.data.users);
      } else {
        // Handle JWT malformed error by redirecting to login
        if (data.error === 'JWT malformed' || data.message?.includes('jwt malformed')) {
          redirectToRoleBasedLogin('ADMIN');
          return;
        }
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user modal
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Refresh users after deletion
  const handleUserDeleted = () => {
    fetchUsers();
  };

  useEffect(() => {
    console.log('AdminUserManagement - Auth state:', { isAuthenticated, token: token ? 'exists' : 'null' });
    // Check if user is authenticated, if not redirect to login
    if (!isAuthenticated) {
      console.log('AdminUserManagement - Not authenticated, redirecting');
      redirectToRoleBasedLogin('ADMIN');
      return;
    }
    console.log('AdminUserManagement - Authenticated, fetching users');
    fetchUsers();
  }, [isAuthenticated]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'var(--error)';
      case 'EMPLOYEE': return 'var(--warning)';
      case 'CLIENT': return '#3b82f6';
      default: return 'var(--text-muted)';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return <Shield className="w-4 h-4" />;
      case 'EMPLOYEE': return <Users className="w-4 h-4" />;
      case 'CLIENT': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent-primary)' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                User Management
              </h1>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Manage system users and their permissions
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--metallic-dark)', 
                  color: 'var(--text-primary)',
                  border: `1px solid var(--border-metallic)`
                }}
              >
                <Key className="w-4 h-4" />
                Change Password
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
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
                <Plus className="w-4 h-4" />
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div 
            className="mb-6 p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'rgba(248, 113, 113, 0.1)',
              borderColor: 'var(--error)',
              color: 'var(--error)'
            }}
          >
            {error}
          </div>
        )}

        {/* Users Table */}
        <div 
          className="rounded-xl border overflow-hidden"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-primary)'
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr 
                    key={user.id}
                    className="border-t"
                    style={{ 
                      borderColor: 'var(--border-primary)',
                      backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--bg-tertiary)'
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {user.email}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          ID: {user.id.substring(0, 8)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span style={{ color: getRoleColor(user.role) }}>
                          {getRoleIcon(user.role)}
                        </span>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `${getRoleColor(user.role)}20`,
                            color: getRoleColor(user.role)
                          }}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-2 rounded transition-colors"
                          style={{ 
                            backgroundColor: 'var(--bg-quaternary)',
                            color: 'var(--text-secondary)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-quaternary)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 rounded transition-colors"
                          style={{ 
                            backgroundColor: 'var(--bg-quaternary)',
                            color: 'var(--text-secondary)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--error)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-quaternary)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              No users found
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Create your first user to get started
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onUserCreated={fetchUsers}
      />

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onUserUpdated={fetchUsers}
        user={selectedUser}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onUserDeleted={handleUserDeleted}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminUserManagement;
