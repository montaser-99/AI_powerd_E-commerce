import Joi from 'joi';

const objectId = Joi.string().hex().length(24);

export const createSubcategorySchema = Joi.object({
  category_id: objectId.required(),
  name_en: Joi.string().trim().max(150).required(),
  name_ar: Joi.string().trim().max(150).required(),
  is_active: Joi.boolean(),
});

export const updateSubcategorySchema = Joi.object({
  category_id: objectId,
  name_en: Joi.string().trim().max(150),
  name_ar: Joi.string().trim().max(150),
  is_active: Joi.boolean(),
}).min(1);

export const idParamSchema = Joi.object({
  id: objectId.required(),
});

export const categoryIdParamSchema = Joi.object({
  categoryId: objectId.required(),
});
