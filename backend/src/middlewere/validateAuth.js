import Joi from 'joi';

// Register User validation schema
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .required()
    .trim(),

  password: Joi.string()
    .min(3)
    .required()
    .trim(),

  email: Joi.string()
    .required()
    .email()
    .lowercase(),
});

// Loging User validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .trim(),

  password: Joi.string()
    .required()
    .min(3)
    .alphanum()

});

// Refresh Access token validation schema
const refreshSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
});

// Logout Validation Schema
const logoutSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
});



// --------------------------------------------------
// Validation functions
// --------------------------------------------------

function registerValidation(req, res, next) {
  // Use joi to validate fields
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    })
  }
  // replace the original data with cleaned version
  req.body = value;
  next();

}

function loginValidation(req, res, next) {

  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    })
  }

  // replace the original data with cleaned version
  req.body = value;
  next();
  
}

function refreshValidation(req, res, next) {

  const { error, value } = refreshSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    })
  }

  // replace the original data with cleaned version
  req.body = value;
  
  next();
}

function logoutValidation(req, res, next) {

  const { error, value } = logoutSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    })
  }

  // replace the original data with cleaned version
  req.body = value;
  next();
  
}
export {registerValidation, loginValidation, refreshValidation, logoutValidation};