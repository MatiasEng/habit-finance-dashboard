function validateTask(req, res, next) {
  const { title, completed } = req.body;
  
  throw Error('Boom!!');

  // 1. Validate the title
  if (!title || typeof title !== 'string') {
    return res.status(400).json({error: "Title not valid"});
  }
  
  // 2. Validate that completed is a boolean
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({error: "Completed must be a boolean"});
  }
  
  // 3. Clean the title 
  req.body.title = title.trim();
  

  next(); // Continue with the next
}

export {validateTask};