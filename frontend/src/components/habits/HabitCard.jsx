import api from '../../lib/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HabitCard({ habit, onHabitUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

  // Initialize state from habit data and localStorage
  useEffect(() => {
    const isCompletedToday = () => {
      if (!habit.completedDates || habit.completedDates.length === 0) return false;

      const todayDate = new Date().toISOString().split('T')[0];

      return habit.completedDates.some(date => {
        const habitDate = date.split('T')[0];
        return habitDate === todayDate;
      });
    };

    const calculateStreak = () => {
      if (!habit.completedDates || habit.completedDates.length === 0) return 0;

      const dates = habit.completedDates
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

    // Check localStorage first, then API data
    const localStorageCompleted = localStorage.getItem(`completed_${habit._id}`);
    const localStorageStreak = localStorage.getItem(`streak_${habit._id}`);

    if (localStorageCompleted !== null) {
      // Use localStorage if available
      setCompleted(localStorageCompleted === 'true');
    } else {
      // Otherwise use API data
      const completedToday = isCompletedToday();
      setCompleted(completedToday);
      localStorage.setItem(`completed_${habit._id}`, completedToday.toString());
    }

    if (localStorageStreak !== null) {
      setStreak(parseInt(localStorageStreak, 10));
    } else {
      const calculatedStreak = calculateStreak();
      setStreak(calculatedStreak);
      localStorage.setItem(`streak_${habit._id}`, calculatedStreak.toString());
    }

  }, [habit]);

  const handleComplete = async () => {
    if (completed) return; // Already completed

    setIsLoading(true);

    try {
      const response = await api.post(`/habits/${habit._id}/complete`);
      const updatedHabit = response.data.updatedHabit;

      // Update local state
      setCompleted(true);

      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Save to localStorage
      localStorage.setItem(`completed_${habit._id}`, 'true');
      localStorage.setItem(`streak_${habit._id}`, newStreak.toString());
      localStorage.setItem(`last_completed_${habit._id}`, new Date().toISOString());

      // Notify parent
      if (onHabitUpdate) {
        onHabitUpdate(updatedHabit);
      }

    } catch (err) {
      console.error('Failed to complete habit', err.message);
      // Revert on error
      setCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completionCount = habit.completedDates ? habit.completedDates.length : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 mb-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {habit.title}
          </h3>
          {habit.category && (
            <h5 className='text-gray-600 mb-1'>{habit.category}</h5>
          )}
          <div className="flex items-center space-x-3 mt-1">
            {streak > 0 && (
              <span className="text-sm text-orange-600">🔥 {streak} days</span>
            )}
            <span className="text-sm text-gray-500">{completionCount} times</span>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2 ml-4">
          <button
            onClick={() => navigate(`/habits/${habit._id}`)}
            className="text-blue-500 bg-blue-100 hover:text-blue-700 text-sm font-medium px-3 py-1 hover:bg-blue-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Details
          </button>

          {!completed ? (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap'
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Completing...
                </div>
              ) : (
                'Complete'
              )}
            </button>
          ) : (
            <button
              disabled
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium opacity-75 text-sm whitespace-nowrap"
            >
              ✓ Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HabitCard;
