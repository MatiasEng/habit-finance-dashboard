import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../lib/api';

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

      alert('Habit Created');
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create habit");
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
    <div className="flex justify-center">

      <div className="flex flex-col justify-center">
        <h1
          className="text-3xl text-gray-800 font-bold shadow"
        >
          Create a new Habit
        </h1>

        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='border pl-2 mb-2'
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className='border pl-2 mb-2'
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white p-1"
          onClick={handleCreateHabit}
          onKeyDown={handleKeyDown}
        >
          Create Habit
        </button>

      </div>
    </div>
  );
}

export default HabitForm;
