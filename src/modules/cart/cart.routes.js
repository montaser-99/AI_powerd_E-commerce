import {addNewCartController} from "./cart.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import express from 'express'
const cartRouter = express.Router()
cartRouter.post("/add",addNewCartController)
export default cartRouter;