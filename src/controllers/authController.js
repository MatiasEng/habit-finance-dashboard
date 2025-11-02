// TODO implement all the functions
// users.push({id: 1, username: "john_doe", email:"john.doe@gmail.com", password: "password1", createdAt: "2025-01-15", isAdmin: true});

import users from '../data/users.js';
let nextId = users.length+1;

function registerUser(req, res) {
  const { username, email, password } = req.body; 
  
  if (!username || !email || !password) return res.status(400).json({error: "All Fields are Require"});
  
  if (users.find(u => u.email === email.toLowerCase())) return res.status(409).json({error: "Email is already registered"});
  
  
  const newUser = {
    id: nextId,
    username: username,
    email: email,
    password: password,
    createdAt: getCurrentDate(),
    isAdmin: false
  }
  
  users.push(newUser);
  res.status(201).json(newUser);
}

function loginUser(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) return res.status(400).json({error: "All fields are required"});
  
  const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
  
  if(!user) return res.status(404).json({error: `User with email ${email} Not Found`});
  

  // JWT
  const token = `fake-jwt-${user.id}-${Date.now()}`;
  
  res.json({token, user: {id: user.id, username: user.username, email: user.email, createdAt: user.createdAt}});
  

}

// TODO: Implement
function logoutUser(req, res) {

}


function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export {registerUser, loginUser, logoutUser};