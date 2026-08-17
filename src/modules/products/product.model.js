import { model, Schema, Types } from "mongoose";
import { DiscountType } from "../../enum/discount-type.js";
import { ProductStatus } from "../../enum/product_status.js";

// PRODUCT SCHEMA 
const productSchema = new Schema({
    // category_id
    categoryId : {
        type : Types.ObjectId,
        ref:"Categories",
        required : true
    },
    // subcategory_id
    subcategoryId : {
        type : Types.ObjectId,
        ref:"Subcategories",
        required : true
    },
    // NAME BY ARABIC 
    nameAr :{
        type : String,
        default:null,
        trim : true
    },
    // NAME BY ENGLISH 
    nameEn :{
        type : String,
        trim : true,
        default:null,
    },
    // DESCRIPTION BY ARABIC 
    descriptionAr :{
        type : String,
        default:null,
        trim : true
    },
    // DESCRIPTION BY ENGLISH 
    descriptionEn :{
        type : String,
        default:null,
        trim : true
    },
    // IMAGE 
    image:{
        type : String,
        trim : true,
        default : null
    },
    // PRICE
    price:{
        type : Types.Decimal128,
        default : 0.0,
        required : true
    },
    // DISCOUNT TYPE 
    discountType:{
        type : String,
        enum :Object.values(DiscountType),
        default : DiscountType.FIXED
    },
    // DISCOUNT VALUE 
    discountValue:{
        type : Types.Decimal128,
        default : 0.0,
    },
    // STATUS
    status:{
        type : String,
        enum :Object.values(ProductStatus),
        default : ProductStatus.AVAILABLE
    
    },

},
{
    timestamps:true,
    strict:true,
    strictQuery:true,
    versionKey:"version",
    toJSON:{getters:true,virtuals:true},
    toObject:{getters:true,virtuals:true},
    collection:"product_data"
}
)
const productModel = model("Product",productSchema)
export default productModel;