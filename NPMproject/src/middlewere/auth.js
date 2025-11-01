// Fake login
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token || token !== "12345") {
    return res.status(401).json({error: "Unauthorized"});
  }
  next();
}

export { requireAuth };