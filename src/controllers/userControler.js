import users from "../data/users.js";
import habits from '../data/habits.js';
import expenses from '../data/expenses.js';


function getMyProfile(req, res) {
  res.json(req.user);
}

function updateProfile(req, res) {
  const user  = req.user;
  const { username, email, password } = req.body;
  
  if (!username && !email && !password) {
    return res.status(400).json({error: "At least one field is require"});
  }
  
  user.username = username ?? user.username;
  user.email = email ?? user.email;
  user.password = password ?? user.password;
  
  res.json({user});
  
}

function deleteAccount(req, res) {
  const userId = req.user.id;

  // delete the habits linked to the user
  // Keep all the habits which userId is different that the userId that we are deleting
  habits = habits.filter(h => h.userId !== userId);

  // delete the expenses linked to the user
  // Keep all the expenses which userId is different that the userId that we are deleting
  expenses = expenses.filter(e => e.userId !== userId); 

  // delete the user 
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return res.status(404).json({error: "User not Found"});
  
  const deletedUser = users.splice(userIndex,1);
  res.json(deletedUser);
  
}

function getAllUsers(req, res) {
  res.json(users);
}

export { getMyProfile, updateProfile, deleteAccount, getAllUsers};
