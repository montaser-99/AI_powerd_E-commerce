import { internalServerResponse } from "../../response/fail.js";
import { createdDataResponse, dataFoundResponse } from "../../response/scuess.js";
import { getAllProductsService } from "../products/product.service.js";
import { placeOrderService, searchProductsService } from "./analytics.service.js";

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
// SEARCH PRODUCTS 
export const searchProductsController = async (request, response) => {
    try {
        const { search } = request.query;

        const products = await searchProductsService(search);
        return dataFoundResponse({ response, data: [products], message: "products" })
    }
    catch (error) {
        console.log("❌ ERROR IN SEARCH PRODUCTS CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
// PLACING ORDERS
export const placeOrderController = async (request, response) => {
    try {
        const userId = request.user._id;

        const { shippingAddress, paymentMethod } = request.body;

        const order = await placeOrderService({userId,shippingAddress,paymentMethod});
        return createdDataResponse({ response, data: order, message: "order" })
    } catch (error) {
        console.log("❌ ERROR IN PLACING ORDERS CONTROLLER :", error)
        return internalServerResponse({ response })
    }
};