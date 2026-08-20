import { internalServerResponse } from "../../response/fail.js";
import { dataFoundResponse } from "../../response/scuess.js";
import { getAllProductsService } from "../products/product.service.js";

// VIEWING PRODUCTS 
export const viewingAllProductsController = async (request, response) => {
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