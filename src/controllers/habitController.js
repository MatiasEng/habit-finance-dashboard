import habits from '../data/habits.js';
let nextId = habits.length+1;

function getHabits(req, res) {
  // User passed from the requireAuth Middlewere
  const user = req.user;
  
  if (!user) return res.status(400).json({error: "User logged in is require"});

  const userId = user.id;
  let userHabits = habits.filter(h => h.userId === userId);
  
  if (!userHabits) return res.status(404).json({error: "No Habits Found for the User"});
  
  res.json(userHabits);
}

function createHabit(req, res) {
  const userId = req.user.id;
  const { title, category, color } = req.body;
  
  if (!userId) return res.status(400).json({error: "User logged in is require"});
  
  if (!title || !category || !color) return res.status(400).json({error: "All Fields Require"});
  
  
  const newHabit = {
    id: nextId,
    userId: userId,
    title: title,
    category: category,
    streak: 0,
    bestStreak: 0,
    color: color,
    completedDates: [],
    createdAt: getCurrentDate()
  }
  
  habits.push(newHabit);
  res.status(201).json(newHabit);
  
}

function getOneHabit(req, res) {
  const habitId = req.params.id;

  const userId = req.user.id;
  let userHabits = habits.filter(h => h.userId === userId);


  if (!userId || !habitId) return res.status(400).json({error: "All fields require"});
  if (userHabits.length === 0 || habitId > userHabits.length || habitId <= 0) { 
    return res.status(404).json({error: "Habit Not Found"})
  }
  if (isNaN(habitId)) return res.status(400).json({error: "The habit ID must be a number"});
  
  const habit = userHabits[habitId-1];
  res.json(habit);

}

function updateOneHabit(req, res) {
  const { title, category, color } = req.body;
  const habitId = req.params.id;
  
  if (!title && !category && !color) return res.status(400).json({error: "At lest 1 field require"});
  if (isNaN(habitId)) return res.status(400).json({error: "The ID must be a number"});
  
  const userId = req.user.id;
  let userHabits = habits.filter(h => h.userId === userId);

  let habit = userHabits[habitId-1];
  if (!habit) return res.status(404).json({error: "Habit Not Found"});
  

  // variable ?? fallback
  // only uses the fallback if the variable is null or undefined
  habit.title = title ?? habit.title;
  habit.category = category ?? habit.category;
  habit.color = color ?? habit.color;

  res.json(habit);
}

function deleteOneHabit(req, res) {
  const habitId = req.params.id;
  
  if (isNaN(habitId)) return res.status(400).json({error: "The ID must be a number"});

  // get the user habits
  const userId = req.user.id;
  let userHabits = habits.filter(h => h.userId === userId);

  // check if the userId index can access a habit 
  let habit = userHabits[habitId-1];
  if (!habit) return res.status(404).json({error: "Habit Not Found"});
  
  habits.splice(habitId-1, 1);
  res.json({message: "Habit Deleted", habit: habit})
}


function markAsDone(req, res) {
  
  const habitId = req.params.id;
  if (isNaN(habitId)) return res.status(400).json({error: "The ID must be a number"});

  const userId = req.user.id;
  const userHabits = habits.filter(h => h.userId === userId);

  let habit = userHabits[habitId-1];
  if (!habit) return res.status(404).json({error: "Habit Not Found"});

  habit.completedDates.push(getCurrentDate());
  
  res.json({habit});
  
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export { getHabits, createHabit, getOneHabit, updateOneHabit, deleteOneHabit, markAsDone };
