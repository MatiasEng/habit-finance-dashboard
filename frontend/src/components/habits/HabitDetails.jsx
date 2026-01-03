import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import { X, Calendar, Tag, CheckCircle, Edit, Trash2, ArrowLeft, Flame, Target, Clock, Hash, TrendingUp } from 'lucide-react';

function HabitDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [localStreak, setLocalStreak] = useState(0);
  const [isCompletedToday, setIsCompletedToday] = useState(false);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await api.get(`/habits/${id}`);
        setHabit(response.data[0]);
        console.log(habit);

        const savedStreak = localStorage.getItem(`habit_streak_${id}`);
        const lastCompleted = localStorage.getItem(`habit_last_completed_${id}`);

        if (savedStreak) setLocalStreak(savedStreak);
        if (lastCompleted) setIsCompletedToday(true);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoading(false);

      }

    }
    if (id) fetchHabit();

  }, [id, navigate])


  const handleClose = () => {
    navigate(-1);
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/habits/${id}`);
      // Clean up localStorage
      localStorage.removeItem(`habit_streak_${id}`);
      localStorage.removeItem(`habit_last_completed_${id}`);

      alert('Habit deleted successfully');
      navigate('/habits');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete habit');
      console.error(err);
    }
  };

  const handleCompleteToday = async () => {
    if (isCompletedToday) return;

    try {
      // First, try to update via API if you have an endpoint
      await api.post(`/habits/${id}/complete`);

      // Update local storage
      const newStreak = localStreak + 1;
      setLocalStreak(newStreak);
      setIsCompletedToday(true);

      localStorage.setItem(`habit_streak_${id}`, newStreak.toString());
      localStorage.setItem(`habit_last_completed_${id}`, new Date().toISOString());

      alert('Habit marked as completed for today!');

    } catch (err) {
      alert('Failed to mark habit as completed');
      console.error(err);
    }
  };

  // !TODO 
  const handleResetStreak = () => {

    setLocalStreak(0);
    setIsCompletedToday(false);
    localStorage.setItem(`habit_streak_${id}`, 0);
    localStorage.removeItem(`habit_last_completed_${id}`);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape)
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
            <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              <Tag className="h-3.5 w-3.5 mr-1.5" />
              {habit.category || 'Uncategorized'}
            </span>
            {isCompletedToday && (
              <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
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
                <Flame className="h-10 w-10 text-orange-500" />
              </div>
            </div>
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {localStreak}
            </div>
            <p className="text-gray-600 font-medium">Day Streak</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-800">Current Streak</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">{localStreak}</div>
            </div>
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
                <h3 className="text-sm font-medium text-gray-600">Last Completed</h3>
              </div>
              <p className="font-semibold text-gray-800">
                {isCompletedToday
                  ? 'Today'
                  : formatDate(localStorage.getItem(`habit_last_completed_${id}`) || habit.lastCompleted)
                }
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
                {isCompletedToday ? 'Already Completed Today' : 'Mark as Completed Today'}
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

          {/* Quick Navigation */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              View all habits{' '}
              <button
                onClick={() => navigate('/habits')}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitDetails;
