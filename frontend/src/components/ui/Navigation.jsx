import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Calendar, DollarSign, User, LogOut } from 'lucide-react';
import api from '../../lib/api';

function Navigation() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get('/users/me');

        setUsername(response.data[0].username);

      } catch (err) {
        console.log(err.message)
      }
    }

    getProfile();
  }, [navigate, username]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo & Navigation Links */}
          <div className="flex items-center">
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="h-10 w-10 bg-linear-to-r from-gray-100 to-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"></span>
                <img src="./../../../public/growth.png" alt="HF" />

              </div>
              <span className="text-xl font-bold text-gray-800 hidden md:inline">
                HabitFinance
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {/* Home Link */}
              <button
                onClick={() => navigate('/')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </button>

              {/* Habits Link */}
              <button
                onClick={() => navigate('/habits')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/habits')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Habits
              </button>

              {/* Expenses Link */}
              <button
                onClick={() => navigate('/expenses')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/expenses')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Expenses
              </button>
            </div>
          </div>

          {/* Right side - User Menu & Actions */}
          <div className="flex items-center space-x-4">
            {/* Welcome message - Desktop */}
            <div className="hidden md:block text-sm text-gray-700">
              Welcome back, <span className="font-semibold text-gray-900">{username || 'User'}</span>
            </div>

            {/* Profile Button */}
            <button
              onClick={() => navigate('/profile')}
              className={`p-2 rounded-full transition-colors ${isActive('/profile')
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              title="Profile"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>

            {/* Mobile Logout Icon */}
            <button
              onClick={handleLogout}
              className="md:hidden p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="md:hidden border-t border-gray-200 pt-3 pb-3">
          <div className="flex justify-around">
            <button
              onClick={() => navigate('/')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => navigate('/habits')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/habits') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Habits</span>
            </button>

            <button
              onClick={() => navigate('/expenses')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/expenses') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <DollarSign className="h-5 w-5" />
              <span className="text-xs mt-1">Expenses</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

