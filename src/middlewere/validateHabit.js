import Joi from 'joi';

const createSchema = Joi.object({
  title: Joi.string()
    .required()
    .max(20)
    .trim(),

  category: Joi.string()
    .required()
    .max(20)
    .trim(),
  

});

const validateId = Joi.object({
  id: Joi.string()
    .required()
    .hex() 

});



// --------------------------------------------------
// Validation functions
// --------------------------------------------------

function createValidation(req, res, next) {
  
  const {error, value } = createSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    });
  }

  // replace the original data with cleaned version
  req.body = value;
  next();

}

function idValidation(req, res, next) {
  const {error, value} = validateId.validate(req.params, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    });
  }

  // replace the original data with cleaned version
  req.body = value;
  next();
}

export {createValidation, idValidation};
