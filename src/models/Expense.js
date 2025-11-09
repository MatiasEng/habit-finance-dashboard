import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  amount: {
    type: Number,
    require: true,
    min: 0
  },
  category: {
    type: String,
    require: true,

    
  },
  description: {
    type: String,
    maxlength: 50,

  },
  date: {
    type: Date,
    default: () => Date.now(),

  }, 
  createdAt: {
    type: Date,
    default: () => Date.now(),
  }

});

export default mongoose.model('Expense', expenseSchema);