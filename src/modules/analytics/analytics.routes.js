import {searchProductsController, viewingAllProductsController,placeOrderController} from "./analytics.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import express from 'express'
import { placeOrderSchema } from "./analytics.validation.js";
const analyticsRouter = express.Router()
analyticsRouter.get("/product/",viewingAllProductsController);
analyticsRouter.get("/product/search",searchProductsController);
analyticsRouter.post("/order/placing",schemaValidate(placeOrderSchema),placeOrderController);
export default analyticsRouter;