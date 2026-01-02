
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

//import HabitCard from '../components/habits/HabitCard';
import HabitsList from '../components/habits/HabitsList';

function HabitDashboard() {

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }
  const createHabit = () => {
    navigate('/habits/habitform')
  }

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold my-3">Habits Dashboard</h1>

      {/* Habits*/}
      <section flex>
        <div className="flex items-center justify-between">
          <h1 className='font-bold text-xl mb-5'>My Habits</h1>
          <button onClick={createHabit}
            className="text-center text-start mb-5 mr-5 border shadow font-semibold px-5 py-2 border-2 border-green-500 rounded-full hover:bg-green-200 transition-colors
          ">+ Create Habit</button>
        </div>
        <HabitsList /> {/* List of habits */}
      </section>

      <button
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 hover:scale-103 transition-colors transition-scale"
        onClick={goHome}
      >Home
      </button>
    </div>
  );
}

export default HabitDashboard;
