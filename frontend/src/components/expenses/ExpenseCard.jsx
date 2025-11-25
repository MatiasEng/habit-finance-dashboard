import {useState, useEffect } from 'react';

function ExpenseCard( {expense, onExpenseUpdate} ) {

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
    const newCount = monthCount+1;
    setMonthCount(newCount);

    if (onExpenseUpdate) {
      onExpenseUpdate({
        ...expense,           // Keep all existing expense properties
        monthCount: newCount  // Add the updated monthCount
      });
    }
    
  }
  
  const handleDecrement = () => {
    const newCount = Math.max(0, monthCount-1);
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
  
  
  const currentMonth = new Date().toLocaleDateString('default', {month: 'long'});

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500 mb-3">
    
      <div className="flex items-start justify-between">
        {/* left side */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="font-semibold text-gray-800 capitalize">
              {expense.category}
            </h3>
            <span className="text-lg font-bold text-green-600">
              ${expense.amount}
            </span>
          </div>
          {expense.description && (
            <p className="text-gray-600 text-sm mt-1">{expense.description}</p>
          )}
        </div>

        {/* Right Side */}
        <div className="ml-4 flex items-center space-x-6">
          
          {/* Count Section*/}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-gray-500 font-medium">{currentMonth}</span>
            <div className="flex items-center space-x-3">

              <button
                onClick={handleDecrement}
                disabled={monthCount <= 0}
                className="w-8 h-8 bg-gray-200 text-gray-700 rounded flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>

              <div className="text-center min-w-12">
                <div className="text-xl font-bold text-gray-800">{monthCount}</div>
                <div className="text-xs text-gray-500">times</div>
              </div>

              <button
                onClick={handleIncrement}
                className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600"
              >
              +
              </button>
            </div>
          </div>

          {/* Total Section */}
          <div className="text-right w-20 border-gray-200 border-l pl-6">
            <div className="text-sm font-semibold text-blue-600">
              ${(expense.amount * monthCount).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;