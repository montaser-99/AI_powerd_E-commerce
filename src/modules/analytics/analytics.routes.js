import {viewingAllProductsController} from "./analytics.controller.js"
import {schemaValidate} from "../../middlewares/validate.js"
import express from 'express'
const analyticsRouter = express.Router()
analyticsRouter.get("/",viewingAllProductsController);

export default analyticsRouter;