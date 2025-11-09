import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    require: true,
    maxlength: 20

  },
  category: {
    type: String,
    require: true,
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
    default: () => Date.now()
    
  }

});

export default mongoose.model('Habit', habitSchema);
const demo = {
  id: 1,
  userId: 1,
  title: "Drink Water",
  category: "Health",
  streak: 4,
  color: "blue",
  bestStreak: 12,
  completedDates: ["2025-04-05", "2025-04-04","2025-04-03"],
  createdAt: Date.now()
}