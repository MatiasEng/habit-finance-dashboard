import api from '../../lib/api';
import {useState} from 'react';

function HabitCard({ habit, onHabitUpdate }) {
  const [isLoading, setIsLoading] = useState('');
  
  const isCompletedToday = () => {
    if (!habit.completedDates || habit.completedDates.length === 0) return false;

    const today = new Date().toDateString();
    
    return habit.completedDates.some(dateString => {
      const completionDate = new Date(dateString);
      return completionDate.toDateString() === today;
    });
  };
  
  const [completed, setCompleted] = useState(isCompletedToday());

  const handleComplete = async () => {
    isLoading(true);
    try {
      const response = await api.post(`/habits/${habit._id}/complete`);
      
      setCompleted(true)

      const updatedHabit = response.data;
      
      // Notify the parent about the update
      if (onHabitUpdate) {
        onHabitUpdate(updatedHabit);
      }

    } catch(err) {
      console.error('Failed to compete habit', err.message)
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
      .sort((a,b) => b -a); // sort from most recent
    
    let streak = 0;
    let currentDate = new Date();
    
    currentDate.setHours(0,0,0,0); // normalize to start of the day
    
    for (let i=0; i < dates.length; i++) {
      const completionDate = new Date(dates[i]);
      completionDate.setHours(0,0,0,0);
      
      const expectedDate = new Date(currentDate);
      
      if(completionDate.getTime() === expectedDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() -1); // move to previous day
      } else if (completionDate < expectedDate) {
        break;
      }
    }
    return streak;
  };
  
  const streak = calculateStreak();
  
  const completionCount = habit.completedDates ? habit.completedDates.length : 0;


  return (
    <div className="bg-white p-4 rounded-lg shadow border-1-4 border-blue-500 mb-3">
      <div className="flex justify-between items-start">
        <div classnName="flex-1">
          <h3 className={`font-semibold text-lg ${completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {habit.title}
          </h3>
          {habit.category && (
            <h5 className='text-gray-600 mt-1'>{habit.category}</h5>
          )}
          <div className="flex items-center space-x-4 mt-2">
            {streak > 0 && (
              <span className="text-sm text-orange-600">
                🔥 {streak} day{streak !== 1 ? 's' : ''}
              </span>
            )}
            <span className="text-sm text-gray-500">
              Completed: {completionCount} times
            </span>
          </div>
        </div>
      </div>
      {/*Complete / redo(to implement) button*/}
      <div className='ml-4 flex space-x-2'>
        {!completed ? (
          <button
            onClick={handleComplete}
            disabled={isLoading}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ...
              </div>
            ) : (
              'Complete'
            )} 
          </button>
        ): (
          <div className="flex space-x-2">
              <button
                disabled
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium opacity-75"
              >
                Completed ✓
              </button>
          </div>
        )}
      </div>

    </div>
  );
}


export default HabitCard;