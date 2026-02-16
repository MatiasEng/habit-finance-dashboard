function requireAdmin(req, res, next) {
  const pswd = req.headers.adminpassword;
  const adminPswd = "Admin12345";
  console.log(pswd);
  
  if (!pswd || pswd !== adminPswd) return res.status(401).json({error: "Unauthorized"});
  
  // The admin password is good
  next();

}


export { requireAdmin };