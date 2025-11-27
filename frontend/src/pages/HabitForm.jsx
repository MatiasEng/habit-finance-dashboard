import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

/*
 * To create a habit I need
  title
  category: make a category selector
*/

function HabitForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  
  const navigate = useNavigate();

  /*
  Auth guard: to avoid bypass using the routes
  */
  
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }




  
  
  useEffect(() => {

  }),[title, category];

  const handleCreateHabit = () => {
    console.log(`newHabit title: ${title} category: ${category}`)

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
          onChange={e => setTitle(e.target.value)}
          className='border pl-2 mb-2'
        />
        <input 
          type="text" 
          placeholder="category"
          onChange={e => setCategory(e.target.value)}
          className='border pl-2 mb-2'
        />
        <button 
          className="bg-blue-500 text-white p-1"
          onClick={handleCreateHabit}
        >
          Create Habit
        </button>

      </div>
    </div>
  );
}

export default HabitForm;