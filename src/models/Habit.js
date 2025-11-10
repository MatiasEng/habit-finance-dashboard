import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 20

  },
  category: {
    type: String,
    required: true,
    maxlength: 20

  },
  streak: {
    type: Number,
    default: 0,

  },
  bestStreak: {
    type: Number,
    default: 0,

  },
  completedDates: {
    type: [Date],

  },
  createdAt:{
    type: Date,
    default: Date.now()
    
  }

});

export default mongoose.model('Habit', habitSchema);