import HabitCard from './HabitCard';
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

function HabitsList() {

  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const habitsRes = await api.get('/habits');

        setHabits(habitsRes.data);

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        };
      } finally {
        setIsLoading(false);
      }

    }

    fetchData();

  }, [navigate]);

  const handleHabitUpdate = (updatedHabit) => {
    setHabits(prevHabits =>
      prevHabits.map(h =>
        h._id === updatedHabit._id ? updatedHabit : h
      )
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading habits...</span>
      </div>
    );
  }


  if (habits.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
        <p className="text-gray-500 mb-4">Start building your good habits!</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Create Your First Habit
        </button>
      </div>
    );
  }

  return (
    <div>
      {habits.map(habit => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onHabitUpdate={handleHabitUpdate}
        />
      ))}
    </div>
  );
};

export default HabitsList;
