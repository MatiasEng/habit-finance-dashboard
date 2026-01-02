import { useNavigate } from 'react-router-dom'
import api from '../lib/api';
import { useEffect, useState } from 'react';


function Home() {


  const [username, setUsername] = useState('');

  const navigate = useNavigate();


  // Get user name for header
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get('/users/me');


        setUsername(response.data[0].username);
        const email = response.data[0].email;

        console.log(username, email)

      } catch (err) {
        console.log(err.message)
      }
    }

    getProfile();
  }, [navigate, username]);


  const habitDashboard = () => {

    navigate('/habits')
  }

  const expenseDashboard = () => {
    navigate('/expenses')

  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar - Simple */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-semibold text-gray-800">HabitFinance</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-gray-700">
                Welcome, <span className="font-medium">{username || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {username || 'User'}!
          </h1>
          <p className="text-gray-600">
            Choose which dashboard you want to view
          </p>
        </div>

        {/* Dashboard Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Habits Dashboard Card */}
          <div
            onClick={habitDashboard}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-blue-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Habit Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Track your daily habits, build streaks, and monitor your progress
              </p>
              <button className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">
                View Habits
              </button>
            </div>
          </div>

          {/* Expenses Dashboard Card */}
          <div
            onClick={expenseDashboard}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-green-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Expense Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Monitor your expenses, track spending, and manage your finances
              </p>
              <button className="bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition-colors w-full">
                View Expenses
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>HabitFinance Dashboard • Manage your habits and finances in one place</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
