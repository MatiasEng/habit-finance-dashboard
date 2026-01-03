import api from '../../lib/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ChevronRight } from 'lucide-react';

function HabitCard({ habit, onHabitUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(false);
  const navigate = useNavigate();

  const isCompletedToday = () => {
    if (!habit.completedDates || habit.completedDates.length === 0) return false;

    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

    return habit.completedDates.some(dateString => {
      const completionDate = new Date(dateString);
      const completionDayUTC = new Date(Date.UTC(
        completionDate.getUTCFullYear(),
        completionDate.getUTCMonth(),
        completionDate.getUTCDate()
      ));

      return completionDayUTC.getTime() === todayUTC.getTime();
    });
  };

  //const [completed, setCompleted] = useState(isCompletedToday());
  const completed = localCompleted || isCompletedToday();

  const handleComplete = async () => {
    setIsLoading(true);
    setLocalCompleted(true);
    try {
      const response = await api.post(`/habits/${habit._id}/complete`);

      //setCompleted(true)

      const updatedHabit = await response.data.updatedHabit;


      // Notify the parent about the update
      if (onHabitUpdate) {
        onHabitUpdate(updatedHabit);
      }

    } catch (err) {
      console.error('Failed to compete habit', err.message)
      setLocalCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Redo
  // todo: make a button to handle redo in the same day

  const calculateStreak = () => {
    if (!habit.completedDates || habit.completedDates.length === 0) return 0;

    // convert string to date objects
    const dates = habit.completedDates
      .map(dateString => new Date(dateString))
      .sort((a, b) => b - a); // sort from most recent

    let streak = 0;
    let currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0); // normalize to start of the day

    for (let i = 0; i < dates.length; i++) {
      const completionDate = new Date(dates[i]);
      completionDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(currentDate);

      if (completionDate.getTime() === expectedDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1); // move to previous day
      } else if (completionDate < expectedDate) {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();
  localStorage.setItem(`habit_streak_${habit._id}`, streak);

  const completionCount = habit.completedDates ? habit.completedDates.length : 0;
  localStorage.setItem(`habit_last_completed_${habit._id}`, isCompletedToday());


  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 mb-3">
      <div className="flex justify-between items-start">
        {/* Left: Title and info */}
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

        {/* Right: Buttons stacked */}
        <div className="flex flex-col items-end space-y-2 ml-4">
          {/* Detail button */}
          <button
            onClick={() => navigate(`/habits/${habit._id}`)}
            className="text-blue-500 bg-blue-100 hover:text-blue-700 text-sm font-medium px-3 py-1 hover:bg-blue-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Details
          </button>

          {/* Complete button */}
          {!completed ? (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap'
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  ...
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
              Completed ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );

}


export default HabitCard;
