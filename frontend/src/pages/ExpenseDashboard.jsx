
import { useNavigate } from 'react-router-dom';

import ExpenseList from '../components/expenses/ExpenseList';

function ExpenseDashboard() {

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const createExpense = () => {
    navigate('/expenses/expenseform')
  }

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold my-3">Expenses Dashboard</h1>

      {/* Expenses*/}
      <section>
        <div>
          <div className="flex items-center justify-between">
            <h1 className='font-bold text-xl mb-5'>My Expenses</h1>
            <button onClick={createExpense}
              className="text-center text-start mb-5 mr-5 border shadow font-semibold px-5 py-2 border-2 border-green-500 rounded-full hover:bg-green-200 transition-colors
          ">+ Track Expense</button>
          </div>
          <ExpenseList />
        </div>

      </section>
      <button
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 hover:scale-103 transition-colors transition-scale"
        onClick={goHome}
      >Home
      </button>
    </div>
  );
}

export default ExpenseDashboard;
