import Joi from "joi";
import { DiscountType } from "../../enum/discount-type.js";
import { ProductStatus } from "../../enum/product_status.js";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "{{#label}} must be a valid MongoDB ObjectId",
  });
// ADD NEW PRODUCT SCHEMA 
export const createProductSchema = Joi.object({
  categoryId: objectId.required().messages({
    "any.required": "Category ID is required",
  }),

  subcategoryId: objectId.required().messages({
    "any.required": "Subcategory ID is required",
  }),

  nameAr: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .allow(null, "")
    .messages({
      "string.min": "Arabic product name must be at least 2 characters",
      "string.max": "Arabic product name cannot exceed 150 characters",
    }),

  nameEn: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .allow(null, "")
    .messages({
      "string.min": "English product name must be at least 2 characters",
      "string.max": "English product name cannot exceed 150 characters",
    }),

  descriptionAr: Joi.string()
    .trim()
    .max(1000)
    .allow(null, ""),

  descriptionEn: Joi.string()
    .trim()
    .max(1000)
    .allow(null, ""),

  image: Joi.string()
    .uri()
    .allow(null, "")
    .messages({
      "string.uri": "Image must be a valid URL",
    }),

  price: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),

  discountType: Joi.string()
    .valid(...Object.values(DiscountType))
    .default(DiscountType.FIXED)
    .messages({
      "any.only": `Discount type must be one of: ${Object.values(
        DiscountType
      ).join(", ")}`,
    }),

  discountValue: Joi.number()
    .precision(2)
    .min(0)
    .default(0)
    .messages({
      "number.base": "Discount value must be a number",
      "number.min": "Discount value cannot be negative",
    }),

  status: Joi.string()
    .valid(...Object.values(ProductStatus))
    .default(ProductStatus.AVAILABLE)
    .messages({
      "any.only": `Status must be one of: ${Object.values(ProductStatus).join(
        ", "
      )}`,
    }),
});
// GET PRODUCT DETAILS 
export const getProductDetailSchema = {
  params: Joi.object({
    id: objectId.required().messages({
      "any.required": "Product ID is required",
    }),
  }),
};