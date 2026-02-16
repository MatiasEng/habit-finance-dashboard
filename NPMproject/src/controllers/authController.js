import {users} from '../controllers/userController.js';

let nextId = users.length+1;

function registerUser(req, res) {
  const {username, email, password } = req.body;

  if (!username || !email || !password) return res.status(400).json({error: "All field Require"});
  
  if (users.find(u => u.email === email)) return res.status(400).json({error: "Email Already Registered"})
  

  const newUser = {
    id: nextId,
    username: username,
    email: email.toLowerCase(),
    password: password
  }
  
  users.push(newUser);
  res.status(201).json(newUser);
}

function loginUser(req, res) {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if(!user) return res.status(404).json({error: "Invalid Credentials"});
  
  const token = `fake-jwt-${user.id}-${Date.now()}`; // Fake JWT
  
  res.json({token, user: {id: user.id, username: user.username, email: user.email}});
}

export { registerUser, loginUser };