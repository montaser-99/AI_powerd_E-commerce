import { internalServerResponse } from "../../response/fail.js"
import { createdDataResponse, dataFoundResponse ,dataUpdatedResponse,dataDeletedResponse} from "../../response/scuess.js";
import {addNewCartService, getAllCartService} from "./cart.service.js"
// ADD NEW CART 
export const addNewCartController = async (request, response) => {
    try {
        const data = request.body;
        const cart = await addNewCartService(data)
        return createdDataResponse({ response, data: cart, message: "cart" })
    }
    catch (error) {
        console.log("❌ ERROR IN ADDING NEW CART CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
// GET ALL CARTS
export const getAllCartController = async (request, response) => {
    try {
        const userId = request.params.userId;
        const cart = await getAllCartService(userId)
        return dataFoundResponse({ response, data: cart, message: "cart" })
    }
    catch (error) {
        console.log("❌ ERROR IN GET ALL CART CONTROLLER :", error)
        return internalServerResponse({ response })
    }

}
