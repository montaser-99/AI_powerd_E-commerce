import {addNewProductController} from "./product.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import {createProductSchema} from "./product.validation.js"
import express from 'express'
const productRouter = express.Router()
productRouter.post("/add",schemaValidate(createProductSchema),addNewProductController)
export default productRouter;