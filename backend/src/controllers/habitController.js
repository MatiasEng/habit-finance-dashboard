import Habit from '../models/Habit.js';

async function getHabits(req, res) {
  // User passed from the requireAuth Middlewere
  try {
    const user = req.user;

    if (!user) return res.status(400).json({ error: "User logged in is require" });


    const userHabits = await Habit.find({ user: user.id });

    if (userHabits.length === 0) return res.status(404).json({ error: "No Habits Found for the User" });

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

    const { title, category } = req.body;

    const newHabit = await Habit.create({
      user: userId,
      title: title,
      category: category,
    });

    res.status(201).json({
      success: true,
      habitCreated: await Habit.find({ _id: newHabit.id }).populate('user', 'username email')
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
    const user = req.user // set the user 

    // Cleaner Version to display
    const habit = await Habit.find({ _id: habitId, user: user.id }, { _id: 0, __v: 0 }).populate('user', 'username email -_id');

    if (!habit) return res.status(404).json({ error: "Habit not found" });

    res.json(habit);

  } catch (err) {
    res.status(400).json({
      user: user.id,
      sucess: false,
      message: "Get habit failed",
      error: err.name === "CastError" ? "Cannot find Habit" : err.message
    });
  }
}

async function updateOneHabit(req, res) {
  try {
    const habitId = req.params.id;
    const user = req.user;

    const updatedHabit = await Habit.findOneAndUpdate({ _id: habitId, user: user.id }, req.body, { new: true })
    if (!updateOneHabit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found on user Habits"
      })
    }

    console.log(req.body);
    res.json({
      success: true,
      updatedHabit: await Habit.findById(habitId).populate('user', 'username email -_id')
    });

  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: "Update habit failed",
      error: err.message
    });
  }
}

async function deleteOneHabit(req, res) {
  try {
    const habitId = req.params.id;
    const user = req.user;


    const habitToDelete = await Habit.find({ _id: habitId, user: user.id }).populate('user', 'username email -_id');

    if (!habitToDelete) {
      return res.status(404).json({
        success: false,
        message: "Habit not found on user Habits"
      })
    }
    await Habit.findOneAndDelete({ _id: habitId, user: user.id });


    res.json({
      success: true,
      deletedHabit: habitToDelete
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Delete habit failed",
      error: err.message
    })

  }
}


async function markAsDone(req, res) {
  try {
    const habitId = req.params.id;
    const user = req.user;

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habitId, user: user.id },
      { $push: { completedDates: Date.now() } },
      { new: true }
    ).populate('user', 'username email -_id');

    if (!updatedHabit) {
      return res.status(404).json({
        success: false,
        message: "Mark habit as done failed"
      });
    }

    res.json({
      success: true,
      updatedHabit: updatedHabit
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Mark as completed failed",
      error: err.message
    })
  }
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export { getHabits, createHabit, getOneHabit, updateOneHabit, deleteOneHabit, markAsDone };
