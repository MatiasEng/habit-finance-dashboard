// Used after requireAuth middlewere
function requireAdmin(req, res, next) {

  const user = req.user;
  
  if (!user) return res.status(400).json({error: "User is require"});

  if (user.isAdmin === false) return res.status(401).json({error: "Unauthorized"});
  
  // The user logged in is admin
  next();

}
export { requireAdmin };