import {addNewCartController,deleteCartItemController,getAllCartController, updateCartQuantityController} from "./cart.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import express from 'express'
import { addCartSchema, getCartSchema, updateCartQuantitySchema,deleteCartItemSchema } from "./cart.validation.js"
const cartRouter = express.Router()
cartRouter.post("/add",schemaValidate(addCartSchema),addNewCartController)
cartRouter.get("/:userId",schemaValidate(getCartSchema),getAllCartController)
cartRouter.patch("/quantity/:productId",schemaValidate(updateCartQuantitySchema),updateCartQuantityController)
cartRouter.delete("/item/:productId",schemaValidate(deleteCartItemSchema),deleteCartItemController)
export default cartRouter;