import ProductModel from "./product.model.js";
// ADD NEW PRODUCT 
export const addNewProductService = async (data) => {
    const product = await ProductModel.create(data)
    return product
}
// GET ALL PRODUCTS 
export const getAllProductsService = async (page = 1, limit = 10) => {

    const skip = (page - 1) * limit;

    const products = await ProductModel
        .find()
        .skip(skip)
        .limit(limit);

    return products;
};
// GET PRODUCTS DETAILS 
export const getProductDetailService = async (productId) => {
    const product = await ProductModel.findById(productId)
    if (!product) throw new Error("product not found");
    return product

};
// UPDATE PROUDCT 
export const updateProductService = async (productId, data) => {
    const product = await ProductModel.findByIdAndUpdate(productId, data, { new: true })
    if (!product) throw new Error("product not found")
    return product

}
// DELETE PRODUCT 
export const deleteProductService = async (productId) => {
    const product = await ProductModel.findByIdAndDelete(productId)
    if (!product) throw new Error("product not found")
    return product

}