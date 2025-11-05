// TODO implement all the functions
// users.push({id: 1, username: "john_doe", email:"john.doe@gmail.com", password: "password1", createdAt: "2025-01-15", isAdmin: true});

import users from '../data/users.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import refreshTokens from '../data/refreshTokens.js'

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

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
  let { email, password } = req.body;
  
  if (!email || !password) return res.status(400).json({error: "All fields are required"});
  
  const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
  
  if(!user) return res.status(404).json({error: `User with email ${email} Not Found`});
  

  // JWT
  let userId = user.id;
  let userEmail = user.email;
  
  const accessToken = jwt.sign({userId, userEmail}, ACCESS_TOKEN, {expiresIn: '15s'});
  const refreshToken = jwt.sign({userId, userEmail}, REFRESH_TOKEN, {expiresIn: '1d'});
  
  refreshTokens.push(refreshToken);

  res.json({accessToken: accessToken, refreshToken: refreshToken});
  
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  
  // refreshTokens is empty
  
  if (!refreshToken) return res.status(401).json({error: "No refresh Token"});
  
  console.log(refreshTokens);
  
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(401).json({error: "Invalid refresh Token"});
  }
  
  try {

    const payload = jwt.verify(refreshToken, REFRESH_TOKEN);
    const {userId, userEmail} = payload;
    
    const newToken = jwt.sign({userId, userEmail}, ACCESS_TOKEN, {expiresIn: '30s'});
    
    res.json({accessToken: newToken});
    
  } catch (err) {
    // remove all the other refresh tokens
    console.error(err);
    res.status(401).json({error: "Invalid refresh Token"});
  }

}

// TODO: remove the refresh token
function logoutUser(req, res) {
  const { refreshToken } = req.body;
  const tokenIndex = refreshTokens.findIndex(t => t === refreshToken);
  
  // if the refesh token is in the array delete it
  if (refreshToken && tokenIndex !== -1) {
    refreshTokens.splice(tokenIndex, 1);
     return res.json({message: "Logged out"});
  }
  
  res.status(404).json({error: "Token not found"});


}


function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export {registerUser, loginUser, logoutUser, refreshAccessToken};