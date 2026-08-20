const Joi = require('joi');

const objectId = Joi.string().hex().length(24);

const createSubcategorySchema = Joi.object({
  category_id: objectId.required(),
  name_en: Joi.string().trim().max(150).required(),
  name_ar: Joi.string().trim().max(150).required(),
  is_active: Joi.boolean(),
});

const updateSubcategorySchema = Joi.object({
  category_id: objectId,
  name_en: Joi.string().trim().max(150),
  name_ar: Joi.string().trim().max(150),
  is_active: Joi.boolean(),
}).min(1);

const idParamSchema = Joi.object({
  id: objectId.required(),
});

const categoryIdParamSchema = Joi.object({
  categoryId: objectId.required(),
});

module.exports = {
  createSubcategorySchema,
  updateSubcategorySchema,
  idParamSchema,
  categoryIdParamSchema,
};
