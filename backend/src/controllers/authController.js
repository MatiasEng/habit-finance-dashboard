// TODO implement all the functions
// users.push({id: 1, username: "john_doe", email:"john.doe@gmail.com", password: "password1", createdAt: "2025-01-15", isAdmin: true});

import User from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import refreshTokens from '../data/refreshTokens.js'

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body; 
    
    // Create a new user
    const newUser = await User.create({
      username: username,
      email: email,
      password: password
    });
    
    res.status(201).json({
      success: true,
      userCreated: {
        username: username,
        email: email
      }
    });

  } catch(err) {
    res.status(400).json({
      success: false,
      message: 'User register failed',
      error: err.message.split(':')[0]
    });

  }
  
}

async function loginUser(req, res) {
  try {
    let { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({error: "All fields are required"});
    

    // JWT
    const user = await User.findOne({email: email, password: password});
    
    if (!user) return res.status(404).json({
      success: false,
      err: "Cannot find a user with email & password provide",
    });

    const accessToken = jwt.sign({userId: user.id}, ACCESS_TOKEN, {expiresIn: '5h'}); // return to original expiration time
    const refreshToken = jwt.sign({userId: user.id}, REFRESH_TOKEN, {expiresIn: '1d'});
    
    refreshTokens.push(refreshToken);

    res.json({accessToken: accessToken, refreshToken: refreshToken});

  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: "Login failed",
      error: err.message
    });
  }
  
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(401).json({error: "Invalid refresh Token"});
  }
  
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN);
    const userId = payload.userId;
    
    const newToken = jwt.sign({userId: userId}, ACCESS_TOKEN, {expiresIn: '30s'});
    
    res.json({accessToken: newToken});
    
  } catch (err) {
    res.status(401).json({
      sucess: false,
      error: "Invalid refresh Token"
    });
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
  
  res.status(404).json({
    sucess: false,
    error: "Token not found"
  });

}


function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export {registerUser, loginUser, logoutUser, refreshAccessToken};