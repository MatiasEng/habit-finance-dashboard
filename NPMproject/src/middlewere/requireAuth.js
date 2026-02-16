// Fake login
// Refactor to accept the username & user password
import { users } from '../controllers/userController.js';

function requireAuth(req, res, next) {
  
  // match the username and the password
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({error: "Token Require"});
  }
  
  const token = authHeader.split(' ')[1];
  
  // Fake JWT verify
  if (!token.startsWith('fake-jwt-')) return res.status(401).json({error: "Invalid Token"});

  const userId = token.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if(!user) return res.status(404).json({error: "User Not Found"});
  
  // The password match the user
  req.user = user;
  next();
}

export { requireAuth };