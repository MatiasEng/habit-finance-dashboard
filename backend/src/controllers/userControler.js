import User from '../models/User.js';
import Habit from '../models/Habit.js';
import Expense from '../models/Expense.js';


async function getMyProfile(req, res) {
  try {
    const user = req.user;
    
    const profile = await User.find({_id: user.id}, {_id: 0, password: 0, __v: 0});
    
    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    
    res.json(profile);

  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Get profile failed",
      error: err.message
    });

  }
}

async function updateProfile(req, res) {
  try {
    const user  = req.user;
    const updatedProfile = await User.findOneAndUpdate({_id: user.id}, req.body, {new: true});

    // check because i think this will never be reached
    if (!updatedProfile) {
      res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    
    res.json({
      success: true,
      updatedprofile: await User.findOne({_id: user.id}, {_id: 0, __v: 0, password: 0})
    });

  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Update profile failed",
      error: err.message
    });

  }
}

async function deleteAccount(req, res) {
  try {
    const user = req.user;
    
    const deletedUser = await User.findOneAndDelete({_id: user.id});
    
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    
    res.json({
      success: true,
      deletedUser: deletedUser
    });

  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Delete account failed",
      error: err.message
    });
    
  }
  
}

async function getAllUsers(req, res) {
  try {
    const user = req.user;
    res.json({
      Admin: {
        username: user.username,
        email: user.email
      },
      Users: await User.find({}, {_id: 0, __v: 0, password: 0})
    });
     
  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Delete account failed",
      error: err.message
    });
    
  }

}

export { getMyProfile, updateProfile, deleteAccount, getAllUsers};
