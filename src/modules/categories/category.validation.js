const Joi = require('joi');

const createCategorySchema = Joi.object({
  name_en: Joi.string().trim().max(150).required(),
  name_ar: Joi.string().trim().max(150).required(),
  image: Joi.string().uri().allow(null),
  is_active: Joi.boolean(),
});

const updateCategorySchema = Joi.object({
  name_en: Joi.string().trim().max(150),
  name_ar: Joi.string().trim().max(150),
  image: Joi.string().uri().allow(null),
  is_active: Joi.boolean(),
}).min(1);

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = { createCategorySchema, updateCategorySchema, idParamSchema };
