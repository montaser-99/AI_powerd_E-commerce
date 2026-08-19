import {activeProductController, addNewProductController, deactiveProductController, deleteProductController, getAllProductsController, getProductDetailController, updateProductController} from "./product.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import {activeProductSchema, createProductSchema,deleteProductSchema,getProductDetailSchema, updateProductSchema} from "./product.validation.js"
import express from 'express'
const productRouter = express.Router()
productRouter.post("/add",schemaValidate(createProductSchema),addNewProductController)
productRouter.get("/",getAllProductsController);
productRouter.get("/:id",schemaValidate(getProductDetailSchema),getProductDetailController);
productRouter.put("/update/:id",schemaValidate(updateProductSchema),updateProductController);
productRouter.delete("/delete/:id",schemaValidate(deleteProductSchema),deleteProductController);
productRouter.patch("/active/:id",schemaValidate(activeProductSchema),activeProductController);
productRouter.patch("/deactive/:id",schemaValidate(activeProductSchema),deactiveProductController);
export default productRouter;