import users from '../data/users.js';
import habits from '../data/habits.js';
import expenses from '../data/expenses.js';
// Return the entire dashboard
/*
User info: username, email, admin
Habits info: title, category, streak, best streak, completed dates
Expense info: category, description, amount, date => total spend

*/
function getEntireDashboard(req, res) {
  const user = req.user;
  const userHabits = habits.filter(h => h.userId === user.id);
  const userExpenses = expenses.filter(e => e.userId === user.id);
  
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