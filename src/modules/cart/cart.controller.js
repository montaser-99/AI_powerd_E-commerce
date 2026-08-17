import { internalServerResponse } from "../../response/fail.js"
import { createdDataResponse, dataFoundResponse ,dataUpdatedResponse,dataDeletedResponse} from "../../response/scuess.js";
import {addNewCartService} from "./cart.service.js"
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
