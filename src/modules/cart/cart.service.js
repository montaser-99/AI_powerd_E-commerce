import CartModel from "./cart.model.js"
import ProductModel from "../products/product.model.js"
// ADD NEW CART 
export const addNewCartService = async(data)=>{
    const productId = await ProductModel.findOne({
        items: { $elemMatch: { productId: data.productId } }
    })
    if(!productId) throw new Error("product not found")
    const cart = await CartModel.create(data)
    return cart

}