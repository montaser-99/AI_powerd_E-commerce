import { model, Schema, Types } from "mongoose";
// CART SCHEMA 
const cartSchema = new Schema({
    // USER ID
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    // ITEMS
    items: [
        {
            productId: {
                type: Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            }
        }
    ],

},
    {
        timestamps: true,
        strict: true,
        strictQuery: true,
        versionKey: "version",
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },
        collection: "cart_data"
    }
)
const cartModel = model("Cart", cartSchema)
export default cartModel;