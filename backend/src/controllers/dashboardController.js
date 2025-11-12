import User from '../models/User.js';
import Habit from '../models/Habit.js';
import Expense from '../models/Expense.js';
// Return the entire dashboard
/*
User info: username, email, admin
Habits info: title, category, streak, best streak, completed dates
Expense info: category, description, amount, date => total spend

*/
async function getEntireDashboard(req, res) {
  try {
    const user = req.user;
    // use the filters to hide data
    const userHabits = await Habit.find({user: user.id});
    const userExpenses = await Expense.find({user: user.id});
    
    const total = userExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    res.json({
      User: {
        username: user.username,
        email: user.email,
        isAdmin: user.idAdmin
      },
      Habits: userHabits,
      Expenses: userExpenses,
      TotalSpend: total
    })

  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Failed to get the dashboard",
      error: err.message
    });
  }

  
  const habitsInfo = userHabits.map(h => ({
    title: h.title,
    category: h.category,
    streak: h.streak,
    bestStreak: h.bestStreak,
    completedDates: h.completedDates
  }));

  const totalSpend = userExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesInfo = userExpenses.map(e => ({
    category: e.category,
    description: e.description,
    amount: e.amount,
    date: e.date

  }));
  
  
  res.json({
    UserInfo: {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }, 
    HabitsInfo: habitsInfo, 
    ExpensesInfo: {
      Expenses: expensesInfo,
      total: totalSpend
    }
  });

}

export { getEntireDashboard };