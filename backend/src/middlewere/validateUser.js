import Joi from 'joi';

// for getMyProfile, get allUsers
const updateSchema = new Joi.object({
  username: Joi.string()
    .min(3)
    .trim(),

  email: Joi.string()
    .email()
    .lowercase(),

  password: Joi.string()
    .min(3),
}).min(1);

function updateValidation(req, res, next) {
  const { error, value } = updateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });


  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed here',
      errors: error.details.map(d => d.message)
    });
  }

  req.body = value;
  next();

}
export { updateValidation };
