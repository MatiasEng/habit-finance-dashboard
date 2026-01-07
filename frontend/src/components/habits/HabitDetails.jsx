import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import { X, Calendar, Tag, CheckCircle, Edit, Trash2, ArrowLeft, Flame, Clock, Hash, TrendingUp } from 'lucide-react';
import { useAlert } from '../hooks/useAlert'

function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [localStreak, setLocalStreak] = useState(0);
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const { showError, showInfo, showWarning, showSuccess, AlertComponent } = useAlert();

  // Helper function to calculate streak from dates
  const calculateStreakFromDates = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return 0;

    const dates = completedDates
      .map(dateString => new Date(dateString))
      .sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
      const completionDate = new Date(dates[i]);
      completionDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(currentDate);

      if (completionDate.getTime() === expectedDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (completionDate < expectedDate) {
        break;
      }
    }
    return streak;
  };

  // Helper to check if habit is completed today from API data
  const isCompletedTodayFromAPI = (habitData) => {
    if (!habitData?.completedDates || habitData.completedDates.length === 0) return false;

    const todayDate = new Date().toISOString().split('T')[0];

    return habitData.completedDates.some(date => {
      const habitDate = date.split('T')[0];
      return habitDate === todayDate;
    });
  };

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await api.get(`/habits/${id}`);
        const habitData = response.data[0];
        setHabit(habitData);

        // Get from localStorage (consistent with HabitCard)
        const savedStreak = localStorage.getItem(`streak_${id}`);
        const completedToday = localStorage.getItem(`completed_today_${id}`);

        console.log('LocalStorage values:', {
          streak: savedStreak,
          completed: completedToday
        });

        // Priority: localStorage > API data
        if (savedStreak) {
          setLocalStreak(Number(savedStreak));
        } else {
          // Calculate from API data
          const calculatedStreak = calculateStreakFromDates(habitData.completedDates || []);
          setLocalStreak(calculatedStreak);
          localStorage.setItem(`streak_${id}`, calculatedStreak.toString());
        }

        if (completedToday !== null) {
          setIsCompletedToday(completedToday === 'true');
        } else {
          const completedFromAPI = isCompletedTodayFromAPI(habitData);
          setIsCompletedToday(completedFromAPI);
          localStorage.setItem(`completed_today_${id}`, completedFromAPI.toString());
        }

      } catch (err) {
        console.log('Error fetching habit:', err.response);
        setError(err.response?.data?.message || 'Failed to fetch habit');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHabit();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/habits/${id}`);
      // Clean up localStorage
      localStorage.removeItem(`streak_${id}`);
      localStorage.removeItem(`completed_today_${id}`);
      localStorage.removeItem(`last_completed_${id}`);

      showSuccess('Habit deleted successfully')
      setTimeout(() => {
        navigate('/habits');
      }, 500)
    } catch (err) {
      showError('Failed to delete habit');
    }
  };

  const handleCompleteToday = async () => {
    if (isCompletedToday) return;

    try {
      // Call API to complete
      const response = await api.post(`/habits/${id}/complete`);
      const updatedHabit = response.data.updatedHabit;

      // Update local state
      const newStreak = localStreak + 1;
      setLocalStreak(newStreak);
      setIsCompletedToday(true);

      // Save to localStorage (consistent with HabitCard)
      localStorage.setItem(`completed_today_${id}`, 'true');
      localStorage.setItem(`streak_${id}`, newStreak.toString());
      localStorage.setItem(`last_completed_${id}`, new Date().toISOString());

      // Update habit data with API response
      if (updatedHabit) {
        setHabit(updatedHabit);
      }
      showSuccess('Habit mark as completed today');


    } catch (err) {
      showError('Failed to mark habit as completed');
    }
  };

  const handleResetStreak = () => {
    setLocalStreak(0);
    setIsCompletedToday(false);
    localStorage.setItem(`streak_${id}`, '0');
    localStorage.setItem(`completed_today_${id}`, 'false');
    localStorage.removeItem(`last_completed_${id}`);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading habit details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !habit) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={handleClose}>
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
          <div className="text-center">
            <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
              <p className="font-medium">{error || 'Habit not found'}</p>
            </div>
            <button
              onClick={handleClose}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <AlertComponent />
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">{habit.title}</h1>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Category & Status Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              <Tag className="h-3.5 w-3.5 mr-1.5" />
              {habit.category || 'Uncategorized'}
            </span>
            {isCompletedToday && (
              <span className="inline-flex items-center px-3 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Completed Today
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Streak Display - Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
              <div className="p-4 bg-white rounded-full shadow-sm">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {localStreak}
            </div>
            <p className="text-gray-600 font-medium">Day Streak</p>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Description Card */}
            {habit.description && (
              <div className="bg-gray-50 p-5 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-700">
                  {habit.description}
                </p>
              </div>
            )}

            {/* Last Completed */}
            <div className="bg-white border border-gray-200 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-600">Completion Status</h3>
              </div>
              <p className="font-semibold text-gray-800">
                {isCompletedToday ? 'Completed Today ✓' : 'Not completed today'}
              </p>
            </div>

            {/* System Information */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-medium text-gray-700 mb-3">System Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Created</span>
                  </div>
                  <span className="text-sm text-gray-800">
                    {formatDate(habit.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Habit ID</span>
                  </div>
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {id.substring(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer - Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="space-y-3">
            {/* Complete/Reset Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCompleteToday}
                disabled={isCompletedToday}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${isCompletedToday
                  ? 'bg-green-100 text-green-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                <CheckCircle className="h-5 w-5" />
                {isCompletedToday ? 'Completed Today' : 'Mark as Complete'}
              </button>

              <button
                onClick={handleResetStreak}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-medium py-3 px-4 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
              >
                <TrendingUp className="h-5 w-5" />
                Reset Streak
              </button>
            </div>

            {/* Edit & Delete Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/habits/edit/${id}`)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Edit className="h-5 w-5" />
                Edit Habit
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitDetails;
