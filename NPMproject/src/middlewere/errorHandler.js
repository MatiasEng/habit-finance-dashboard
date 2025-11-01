
// To trigger this error we have 2 options
// 1. next(err)
//    in a try catch, in the catch we use that to 
//    pass the error to the error handler
// 2. throw Error() self explanatory
function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message}`);
  
  const status = err.status || 500;
  const message = err.message || "Server Error";
  
  res.status(status).json({error: message})
}

export {errorHandler};