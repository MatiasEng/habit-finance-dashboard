import Habit from '../models/Habit.js';

async function getHabits(req, res) {
  // User passed from the requireAuth Middlewere
  try {
    const user = req.user;
    
    if (!user) return res.status(400).json({error: "User logged in is require"});


    const userHabits = await Habit.find({user: user.id});
    
    if (userHabits.length === 0) return res.status(404).json({error: "No Habits Found for the User"});
    
    res.json(userHabits);

  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: "Get habits failed",
      error: err.message
    });
    
  }
}

async function createHabit(req, res) {
  try {
    const userId = req.user.id;

    const { title, category} = req.body;
    
    const newHabit = await Habit.create({
      user: userId,
      title: title,
      category: category,
    });
    
    console.log(newHabit.id);
    res.status(201).json({
      success: true,
      habitCreated: await Habit.find({_id: newHabit.id}).populate('user', 'username email')
    });


  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: "Habit creation failed",
      error: err.message
    });
    
  }
  
}

async function getOneHabit(req, res) {
  try {
    // varify through validation
    const habitId = req.params.id;

    const userId = req.user.id;
    const userHabits = await Habit.find({user: userId});

    if (userHabits.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Not Habits find for the User"
      });
    }
    
    // Cleaner Version to display
    const habit = await Habit.find({_id: habitId}, {_id: 0, __v: 0}).populate('user', 'username email -_id');
    console.log(habit);

    if (!habit) return res.status(404).json({error: "Habit not found"});
    
    res.json(habit);

  } catch (err) {
    res.status(400).json({
        sucess: false,
        message: "Get habit failed",
        error: err.name === "CastError" ? "Cannot find Habit" : err.message
      });
   
  }

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
  
  const habitIndex = habits.findIndex(h => h.id === habit.id);
  
  habits.splice(habitIndex, 1);
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
