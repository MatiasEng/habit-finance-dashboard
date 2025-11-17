import api from '../../lib/api';
import {useState} from 'react';

function HabitCard({ habit, onHabitUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(false);
  
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
      
      console.log(response);
      
      // Notify the parent about the update
      if (onHabitUpdate) {
        onHabitUpdate(updatedHabit);
      }

    } catch(err) {
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
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 mb-3"> {/* Fixed: border-l-4 */}
      <div className="flex justify-between items-start">
        <div className="flex-1"> {/* Fixed: className */}
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
        
        {/* Complete button - moved inside the flex container */}
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
          ) : (
            <div className="flex space-x-2">
              <button
                disabled
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium opacity-75"
              >
                Completed ✓
              </button>
              {/* Redo button placeholder for when you implement it */}
              {/* <button className="bg-gray-500 text-white px-3 py-2 rounded-lg text-sm">
                Redo
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default HabitCard;