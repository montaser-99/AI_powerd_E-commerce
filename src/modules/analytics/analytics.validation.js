import Joi from "joi";
// PLACING ORDER 
export const placeOrderSchema = Joi.object({
  shippingAddress: Joi.object({
    fullName: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .required()
      .messages({
        "string.empty": "Full name is required",
        "string.min": "Full name must be at least 3 characters",
        "string.max": "Full name cannot exceed 100 characters"
      }),

    phone: Joi.string()
      .pattern(/^01[0125][0-9]{8}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required",
        "string.pattern.base": "Invalid Egyptian phone number"
      }),

    address: Joi.string()
      .trim()
      .min(5)
      .max(300)
      .required()
      .messages({
        "string.empty": "Address is required",
        "string.min": "Address must be at least 5 characters",
        "string.max": "Address cannot exceed 300 characters"
      }),

    city: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.empty": "City is required",
        "string.min": "City must be at least 2 characters",
        "string.max": "City cannot exceed 100 characters"
      })
  })
    .required(),

  paymentMethod: Joi.string()
    .valid("cash", "card")
    .required()
    .messages({
      "any.only": "Payment method must be cash or card",
      "string.empty": "Payment method is required"
    })
});