import ProductModel from "../products/product.model.js";
import CartModel from "../cart/cart.model.js"
import OrderModel from "../orders/order.model.js"
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
// PLACING ORDER 
export const placeOrderService = async ({userId,shippingAddress,paymentMethod}) => {
    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }
    const productIds = cart.items.map(item => item.productId);

    const products = await ProductModel.find({
        _id: { $in: productIds }
    });
    const orderItems = [];
    let totalAmount = 0;

    for (const cartItem of cart.items) {
        const product = products.find(
            p => p._id.toString() === cartItem.productId.toString()
        );

        if (!product) {
            throw new Error(
                `Product ${cartItem.productId} not found`
            );
        }

        if (product.stock < cartItem.quantity) {
            throw new Error(
                `Not enough stock for ${product.name.en}`
            );
        }
        const itemTotal =
            product.price * cartItem.quantity;

        orderItems.push({
            productId: product._id,
            quantity: cartItem.quantity,
            price: product.price,
            total: itemTotal
        });

        totalAmount += itemTotal;
    }
    const order = await OrderModel.create({
        userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        status: "pending"
    });
    for (const item of cart.items) {
        await Product.findByIdAndUpdate(
            item.productId,
            {
                $inc: {
                    stock: -item.quantity
                }
            }
        );
    }
    cart.items = [];
    await cart.save();

    return order;
};