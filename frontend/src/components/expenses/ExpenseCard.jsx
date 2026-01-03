import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ExpenseCard({ expense, onExpenseUpdate }) {


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [monthCount, setMonthCount] = useState(() => {
    try {
      const savedCount = localStorage.getItem(`expense_count_${expense._id}`);
      return savedCount ? parseInt(savedCount) : 0;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return 0;
    }
  });


  const handleIncrement = () => {
    const newCount = monthCount + 1;
    setMonthCount(newCount);

    if (onExpenseUpdate) {
      onExpenseUpdate({
        ...expense,           // Keep all existing expense properties
        monthCount: newCount  // Add the updated monthCount
      });
    }

  }

  const handleDecrement = () => {
    const newCount = Math.max(0, monthCount - 1);
    setMonthCount(newCount);
    if (onExpenseUpdate) {
      onExpenseUpdate({
        ...expense,           // Keep all existing expense properties
        monthCount: newCount  // Add the updated monthCount
      });
    }

  }

  // Only save to localStorage when monthCount changes
  useEffect(() => {
    try {
      localStorage.setItem(`expense_count_${expense._id}`, monthCount.toString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [monthCount, expense._id]);


  const currentMonth = new Date().toLocaleDateString('default', { month: 'long' });
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex flex-col gap-3">
        {/* Header with amount and detail button */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xl font-bold text-green-600">${expense.amount}</div>
            <div className="text-sm font-medium text-gray-700 capitalize">
              {expense.category}
            </div>
          </div>

          <button
            onClick={() => navigate(`/expenses/${expense._id}`)}
            className="px-3 py-1 bg-blue-100 text-blue-600 text-m font-medium rounded-lg hover:bg-blue-200 transition-colors"
          >
            Details
          </button>
        </div>

        {/* Description */}
        {expense.description && (
          <p className="text-gray-600 text-sm">{expense.description}</p>
        )}

        {/* Counter Section */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">This month:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  disabled={monthCount <= 0}
                  className="w-7 h-7 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-30"
                >
                  -
                </button>

                <span className="font-bold text-lg text-gray-800">{monthCount}</span>

                <button
                  onClick={handleIncrement}
                  className="w-7 h-7 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-blue-600">
                ${(expense.amount * monthCount).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ExpenseCard;
