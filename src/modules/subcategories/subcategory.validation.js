import Joi from "joi";

 const smartListValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .required(),

  type: Joi.string()
    .valid("SHOPPING_LIST", "FAVORITES")
    .required(),

  items: Joi.array()
    .default([]),
});

export default smartListValidation