import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import ExpenseCard from './ExpenseCard';

function ExpenseList() {

  const [expenses, setExpenses] = useState([]);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const total = expenses.reduce((total, expense) => {
      const savedCount = localStorage.getItem(`expense_count_${expense._id}`);
      const count = savedCount ? parseInt(savedCount) : 0;
      return total + (expense.amount * count);
    }, 0);
    setTotalMonthly(total);
  }, [expenses]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const expensesRes = await api.get('/expenses');
        setExpenses(expensesRes.data);

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }

      } finally {
        setIsLoading(false);
      }

    }
    fetchData();
  }, [navigate]);


  const handleExpenseUpdate = (updatedExpense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(h =>
        h._id === updatedExpense._id ? updatedExpense : h
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <span className="ml-3 text-gray-600">Loading expenses...</span>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
        <p className="text-gray-500 mb-4">Start tracking your expenses!</p>
        <button
          onClick={() => { navigate('/expenseform') }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Track your first expense
        </button>
      </div>
    )

  }


  return (
    <div>
      {/* Monthly Summary */}
      <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Monthly Spending</h3>
            <p className="text-green-100">Track your expenses this month</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${totalMonthly}</p>
            <p className="text-green-100 text-sm">Total this month</p>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {expenses.map(expense => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            onExpenseUpdate={handleExpenseUpdate}
          />
        ))}
      </div>
    </div>
  );

}

export default ExpenseList;
