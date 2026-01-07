// pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit,
  Trash2,
  ArrowLeft,
  Key,
  LogOut,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAlert } from '../components/hooks/useAlert';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { showError, showInfo, showWarning, showSuccess, AlertComponent } = useAlert();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        const userData = response.data[0];
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    setShowPasswordModal(true);
  };

  const confirmDeleteAccount = async () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      showWarning('Password is required')
      return;
    }

    setIsDeleting(true);
    setPasswordError('');

    // Verify password first
    const verifyResponse = password === user.password;

    if (!verifyResponse) {
      setPasswordError('Incorrect password');
      setIsDeleting(false);
      showError('Password is incorrect');
      return;
    }

    // Password is correct, proceed with deletion
    try {
      await api.delete('/users/me');

      // Clear tokens and redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.clear(); // Clear all localStorage data


      showSuccess('Account deleted successfully');
      setTimeout(() => {
        navigate('/login');
      }, 500);

    } catch (err) {
      showError('Failed to delete account')

      if (err.response?.status === 401) {
        setPasswordError('Incorrect password');
      } else {
        setPasswordError(err.response?.data?.message || 'Failed to delete account');
      }

      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
    setIsDeleting(false);
    setShowPassword(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    showInfo('Loggin out...')
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
            <p className="font-medium">{error || 'Profile not found'}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <AlertComponent />

      {/* Password Confirmation Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
              </div>
              <button
                onClick={cancelDelete}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <div className="h-5 w-5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-semibold">Warning: This action cannot be undone!</p>
                </div>
                <p className="text-gray-600">
                  All your data including habits, expenses, and profile information will be permanently deleted.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your password to confirm deletion
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className={`w-full px-4 py-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent pr-12`}
                    placeholder="Your password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAccount}
                  disabled={isDeleting || !password.trim()}
                  className="flex-1 bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your account settings and information</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                {/* Profile Picture/Initial */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </p>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => navigate('/profile/edit')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Member Since */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <h4 className="font-medium text-gray-700">Member Since</h4>
                    </div>
                    <p className="text-gray-800">{formatDate(user.createdAt)}</p>
                  </div>

                  {/* Account Type */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <h4 className="font-medium text-gray-700">Account Type</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.isAdmin
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {user.isAdmin ? 'Administrator' : 'Standard User'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User ID */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <h4 className="font-medium text-gray-700">User ID</h4>
                  </div>
                  <p className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-2 rounded">
                    {user._id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Change Password Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Security</h3>
              </div>
              <button
                onClick={() => navigate('/profile/changepassword')}
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                Change Password
              </button>
            </div>

            {/* Danger Zone Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">Danger Zone</h3>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Deleting your account will remove all your data permanently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
