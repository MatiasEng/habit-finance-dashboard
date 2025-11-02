import users from '../data/users.js';

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({error: "Token require"});
  
  const token = authHeader.split(' ')[1];
  
  // Verify the JWT
  if (!token.startsWith('fake-jwt-')) return res.status(400).json({error: "Invalid Token"});
  
  const userId = token.split('-')[2];

  const user = users.find(u => u.id == userId);
  
  if (!user) return res.status(404).json({error: "User Not Found"});
  
  req.user = user;
  
  next();

}


export { requireAuth };