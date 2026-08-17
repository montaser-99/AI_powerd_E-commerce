import CartModel from "./cart.model.js"
import ProductModel from "../products/product.model.js"
import UserModel from "../users/user.model.js"
// ADD NEW CART 
export const addNewCartService = async(data)=>{
    const productId = await ProductModel.findOne({
        items: { $elemMatch: { productId: data.productId } }
    })
    if(!productId) throw new Error("product not found")
    const cart = await CartModel.create(data)
    return cart

}
// GET ALL CARTS 
export const getAllCartService = async(userId)=>{
    const user = await UserModel.findById(userId)
    if(!user) throw new Error("user not found")
    const cart = await CartModel.find().where({userId:user._id})
    if(!cart) throw new Error("cart not found")
    return cart

}