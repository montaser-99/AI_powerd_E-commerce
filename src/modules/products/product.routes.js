import {addNewProductController, getAllProductsController, getProductDetailController, updateProductController} from "./product.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import {createProductSchema,getProductDetailSchema, updateProductSchema} from "./product.validation.js"
import express from 'express'
const productRouter = express.Router()
productRouter.post("/add",schemaValidate(createProductSchema),addNewProductController)
productRouter.get("/",getAllProductsController);
productRouter.get("/:id",schemaValidate(getProductDetailSchema),getProductDetailController);
productRouter.put("/update/:id",schemaValidate(updateProductSchema),updateProductController);
export default productRouter;