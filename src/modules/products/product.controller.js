import { internalServerResponse } from "../../response/fail.js"
import { createdDataResponse, dataFoundResponse ,dataUpdatedResponse,dataDeletedResponse} from "../../response/scuess.js";
import { activeProductService, addNewProductService, deactiveProductService, deleteProductService, getAllProductsService, getProductDetailService ,updateProductService} from "./product.service.js"
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
// GET PRODUCTS DETAILS
export const getProductDetailController = async (request, response) => {
    try {
        const productId = request.params.id;
        const products = await getProductDetailService(productId);
        return dataFoundResponse({ response, data: products, message: "product" })
    }
    catch (error) {
        console.log("❌ ERROR IN GET PRODUCTS DETAILS CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
//  UPDATE PRODUCT
export const updateProductController = async (request, response) => {
    try {
        const productId = request.params.id;
        const data = request.body;
        const products = await updateProductService(productId,data);
        return dataUpdatedResponse({ response, data: products, message: "product" })
    }
    catch (error) {
        console.log("❌ ERROR IN UPDATE PRODUCT DETAILS CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
//  DELETE PRODUCT
export const deleteProductController = async (request, response) => {
    try {
        const productId = request.params.id;
        const products = await deleteProductService(productId);
        return dataDeletedResponse({ response, data: products, message: "product" })
    }
    catch (error) {
        console.log("❌ ERROR IN DELETE PRODUCT DETAILS CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
//  ACTIVE PRODUCT
export const activeProductController = async (request, response) => {
    try {
        const productId = request.params.id;
        const data = request.body.status;
        const products = await activeProductService(productId,data);
        return dataUpdatedResponse({ response, data: products, message: "product" })
    }
    catch (error) {
        console.log("❌ ERROR IN ACTIVE PRODUCT CONTROLLER :", error)
        return internalServerResponse({ response })
    }
}
//  DEACTIVE PRODUCT
export const deactiveProductController = async (request, response) => {
    try {
        const productId = request.params.id;
        const data = request.body.status;
        const products = await deactiveProductService(productId,data);
        return dataUpdatedResponse({ response, data: products, message: "product" })
    }
    catch (error) {
        console.log("❌ ERROR IN DEACTIVE PRODUCT CONTROLLER :", error)
        return internalServerResponse({ response })
    }
}
