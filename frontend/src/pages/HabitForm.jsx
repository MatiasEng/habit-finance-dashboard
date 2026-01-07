import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAlert } from '../components/hooks/useAlert'

/*
 * To create a habit I need
  title
  category: make a category selector
*/

function HabitForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { showInfo, showError, showWarning, showSuccess, AlertComponent } = useAlert();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }), [navigate];


  const handleCreateHabit = async () => {

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!category.trim()) {
      setError('Category is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/habits', {
        title: title.trim(),
        category: category.trim()
      });

      setTitle('');
      setCategory('');


      showSuccess('Habit Created Successfully');
      setTimeout(() => {
        navigate('/habits')
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create habit");
      showError('Something went wrong');
    } finally {
      setLoading(false);
    }

    ;

  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateHabit();
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <AlertComponent />
      <div className="w-full max-w-md">
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">+</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create New Habit
            </h1>
            <p className="text-gray-600">
              Track your progress with a new habit
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habit Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Morning Exercise, Read 30 mins, Drink Water"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 bg-gray-50"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Health, Learning, Productivity, Finance"
                value={category}
                onChange={e => setCategory(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 bg-gray-50"
              />
              <p className="mt-2 text-sm text-gray-500">
                Examples: Health, Fitness, Learning, Finance, Productivity
              </p>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateHabit}
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Habit...
                </>
              ) : (
                'Create Habit'
              )}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Tips Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              💡 Tips for effective habits:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Make it specific and measurable</li>
              <li>• Start small and build consistency</li>
              <li>• Choose a clear category for better tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}

export default HabitForm;
