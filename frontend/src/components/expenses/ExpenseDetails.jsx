
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Hash, X, Calendar, Tag, DollarSign, FileText, Edit, Trash2, ArrowLeft } from 'lucide-react';



function ExpenseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await api.get(`/expenses/${id}`);
        setExpense(response.data.expense[0]);

      } catch (err) {
        console.log(err.response);

      } finally {
        setLoading(false);
      }
    }
    if (id) fetchExpense();
  }, [id]);


  const handleClose = () => {
    navigate(-1);
  };


  const handleDelete = async () => {

    try {
      await api.delete(`/expenses/${id}`);
      alert('Expense deleted successfully');
      navigate('/expenses'); // Go back to expenses list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete expense');
      console.error(err);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600">Loading expense details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !expense) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={handleClose}>
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
          <div className="text-center">
            <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
              <p className="font-medium">{error || 'Expense not found'}</p>
            </div>
            <button
              onClick={handleClose}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Expense Details</h1>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Category & Date Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              <Tag className="h-3.5 w-3.5 mr-1.5" />
              {expense.category || 'Uncategorized'}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(expense.date)}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Amount Display - Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl mb-4">
              <div className="p-4 bg-white rounded-full shadow-sm">
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div className="text-5xl font-bold text-gray-800 mb-2">
              ${parseFloat(expense.amount).toFixed(2)}
            </div>
            <p className="text-gray-600 font-medium">Amount Spent</p>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Description Card */}
            <div className="bg-gray-50 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Description</h2>
              </div>
              <p className="text-gray-700 pl-12">
                {expense.description || 'No description provided'}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="bg-white border border-gray-200 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-600">Category</h3>
                </div>
                <p className="font-semibold text-gray-800">{expense.category}</p>
              </div>

              {/* Expense Date */}
              <div className="bg-white border border-gray-200 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-600">Expense Date</h3>
                </div>
                <p className="font-semibold text-gray-800">
                  {formatDate(expense.date)}
                </p>
              </div>
            </div>

            {/* System Information (Created At, ID) */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-medium text-gray-700 mb-3">System Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Created</span>
                  </div>
                  <span className="text-sm text-gray-800">
                    {new Date(expense.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Expense ID</span>
                  </div>
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {id.substring(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer - Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex gap-3">
            {/* Edit Button */}
            <button
              onClick={() => {
                // Navigate to edit form, or implement inline edit
                navigate(`/expenses/edit/${id}`);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-5 w-5" />
              Edit Expense
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-medium py-3 px-4 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <Trash2 className="h-5 w-5" />
              Delete
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              View all expenses{' '}
              <button
                onClick={() => navigate('/expenses')}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
