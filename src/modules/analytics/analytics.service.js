import ProductModel from "../products/product.model.js";
// SEARCH PRODUCT BY NAME 
export const searchProductsService = async (search) => {
  if (!search || !search.trim()) {
    return {
      products: [],
      total: 0
    };
  }

  const searchTerm = search.trim();

  const products = await ProductModel.find({
    $or: [
      {
        "nameEn": {
          $regex: searchTerm,
          $options: "i"
        }
      },
      {
        "nameAr": {
          $regex: searchTerm,
          $options: "i"
        }
      }
    ]
  })
    .select("-__v")
    .sort({ createdAt: -1 });

  return {
    products,
    total: products.length
  };
};