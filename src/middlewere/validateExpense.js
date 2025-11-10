import Joi from 'joi';

const createSchema = Joi.object({
  amount: Joi.number()
    .required()
    .min(0),

  category: Joi.string()
    .required()
    .min(3)
    .trim(),

  description: Joi.string()
    .optional()
    .max(50),

  date: Joi.date()
    .optional()

});

const updateSchema = Joi.object({
  amount: Joi.number()
    .min(0),

  category: Joi.string()
    .min(3)
    .trim(),

  description: Joi.string()
    .max(50),

  date: Joi.date()

}).min(1);

const idSchema = Joi.object({
  id: Joi.string()
    .required()
    .hex() 

});

function createValidation(req, res, next) {
  
  const { error, value } = createSchema.validate(req.body , {
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
  
  req.body = value;
  next();
}

function updateValidation(req, res, next) {
  
  const { error, value } = updateSchema.validate(req.body , {
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
  
  req.body = value;
  next();
}

function idValidation(req, res, next) {

  const { error, value } = idSchema.validate(req.params, {
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
  
  req.params = value;
  next();
}

export { createValidation, updateValidation, idValidation };