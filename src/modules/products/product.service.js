import ProductModel from "./product.model.js";
// ADD NEW PRODUCT 
export const addNewProductService = async (data) => {
    const product = await ProductModel.create(data)
    return product
}