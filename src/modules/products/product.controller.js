import { internalServerResponse } from "../../response/fail.js"
import { createdDataResponse } from "../../response/scuess.js";
import {addNewProductService} from "./product.service.js"
// ADD NEW PRODUCT 
export const addNewProductController = async (request,response)=>{
    try{
        const data = request.body;
        const product = await addNewProductService(data)
        return createdDataResponse({response,data:product,message:"product"})
    }
    catch(error){
        console.log("❌ ERROR IN ADDING NEW PRODUCT CONTROLLER :",error)
        return internalServerResponse({response})
    }

}