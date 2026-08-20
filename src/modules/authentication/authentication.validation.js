import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(20).required(),
  last_name: Joi.string().trim().min(2).max(20).required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(12).required(),
  phone: Joi.string().trim().required(),
});

export { registerSchema };