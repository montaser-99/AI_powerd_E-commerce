import { internalServerResponse } from "../../response/fail.js"
import { createdDataResponse, dataFoundResponse } from "../../response/scuess.js";
import { addNewProductService, getAllProductsService } from "./product.service.js"
// ADD NEW PRODUCT 
export const addNewProductController = async (request, response) => {
    try {
        const data = request.body;
        const product = await addNewProductService(data)
        return createdDataResponse({ response, data: product, message: "product" })
    }
    catch (error) {
        console.log("❌ ERROR IN ADDING NEW PRODUCT CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
// GET ALL PRODUCTS 
export const getAllProductsController = async (request, response) => {
    try {
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 10;

        const products = await getAllProductsService(page, limit);
        return dataFoundResponse({ response, data: products, message: "products" })
    }
    catch (error) {
        console.log("❌ ERROR IN GET ALL PRODUCTS CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
