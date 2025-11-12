import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function requireAuth(req, res, next) {
  // Get the JWT
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({error: "Token require"});
  
  const token = authHeader.split(' ')[1];
  

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN);
    // get the userId
    const userId = payload.userId;
    
    const user = await User.findById(userId);
    
    // Verify the JWT
    req.user = user;
    next();

  } catch (err) {
    console.error(err.name);
    if (err.name === 'TokenExpiredError') return res.status(401).json({error: "Token is expired"});
    res.status(401).json({error: "Invalid Access Token"});
  }

}

export { requireAuth };