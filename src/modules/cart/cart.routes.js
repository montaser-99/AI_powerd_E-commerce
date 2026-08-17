import {addNewCartController,getAllCartController} from "./cart.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import express from 'express'
import { addCartSchema } from "./cart.validation.js"
const cartRouter = express.Router()
cartRouter.post("/add",schemaValidate(addCartSchema),addNewCartController)
cartRouter.get("/:userId",getAllCartController)
export default cartRouter;