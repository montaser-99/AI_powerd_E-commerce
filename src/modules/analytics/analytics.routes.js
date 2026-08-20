import {searchProductsController, viewingAllProductsController} from "./analytics.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import express from 'express'
const analyticsRouter = express.Router()
analyticsRouter.get("/product/",viewingAllProductsController);
analyticsRouter.get("/product/search",searchProductsController);

export default analyticsRouter;