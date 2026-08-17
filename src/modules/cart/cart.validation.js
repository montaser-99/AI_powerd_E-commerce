import Joi from "joi";

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
// ADD TO CART
export const addCartSchema = {
    body: Joi.object({
        userId: objectId.required().messages({
            "any.required": "User ID is required",
            "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
        }),

        items: Joi.array()
            .items(
                Joi.object({
                    productId: objectId.required().messages({
                        "any.required": "Product ID is required",
                        "string.pattern.base":
                            "Product ID must be a valid MongoDB ObjectId",
                    }),

                    quantity: Joi.number()
                        .integer()
                        .min(1)
                        .default(1)
                        .messages({
                            "number.base": "Quantity must be a number",
                            "number.integer": "Quantity must be an integer",
                            "number.min": "Quantity must be at least 1",
                        }),
                })
            )
            .required()
            .min(1)
            .messages({
                "any.required": "Items are required",
                "array.min": "Cart must contain at least one item",
            }),
    }),
};
// GET CART
export const getCartSchema = {
    params: Joi.object({
        userId: objectId.required().messages({
            "any.required": "User ID is required",
            "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
        }),
    })
}; 
// UPDATE CART QUNATITY 
export const updateCartQuantitySchema = {
  params: Joi.object({
    productId: objectId.required().messages({
      "any.required": "Product ID is required",
      "string.pattern.base": "Product ID must be a valid MongoDB ObjectId",
    }),
  }),

  body: Joi.object({
    quantity: Joi.number()
      .integer()
      .min(1)
      .required()
      .messages({
        "any.required": "Quantity is required",
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity must be at least 1",
      }),
  }),
};
// DELETE PRODUCT IN CART 
export const deleteCartItemSchema = {
  params: Joi.object({
    productId: objectId.required().messages({
      "any.required": "Product ID is required",
      "string.pattern.base":
        "Product ID must be a valid MongoDB ObjectId",
    }),
  }),
};
