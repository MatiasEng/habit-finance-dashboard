import {useState, useEffect} from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
  const [habits, setHabits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habitsRes, expensesRes] = await Promise.all([
          api.get('/habits'),
          api.get('/expenses')
        ]);
        
        setHabits(habitsRes.data);
        setExpenses(expensesRes.data);

      } catch(err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  
  if (loading) return (
    <p>
      Loading...
    </p>
  )

  
  return(
    <div className="p-8">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Habits*/}
      <section>
        <h2>My Habits</h2>
        {habits.map(h => (
          <div key={h._id}>
            {h.title}
          </div>
        ))}
      </section>
      {/* Expenses*/}
      <section>
        <h2>My Expenses</h2>
        {expenses.map(e => (
          <div key={e._id}>
            <span>{`${e.category} - ${e.amount}`}</span>
          </div>
        ))}
      </section>
      <button onClick={handleLogout()}>Log Out</button>
    </div>
  );
}

export default Dashboard;