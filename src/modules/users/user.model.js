import mongoose from "mongoose";
import bcrypt from "bcryptjs";




const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true,
        minLength:2,
        maxLLength:20
    },
      lasttName:{
        type:String,
        required:true,
        trim: true,
        minLength:2,
        maxLLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:12,
        select:false
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    auth_provider:{
        type:String,
        enum:["local","googal"],
        default:"local"
    },
    role:{
        type:String,
        enum:["guest","user","delivery_partner","support_agent","admin"],
        default:"user"
    },
    account_status:{
        type:String,
        enum:["active","inactive","suspended","deleted"],
        default:"active"
    },
    profile_picture:{
        type:String,
        default:null
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    phone_verified:{
        type:Boolean,
        default:false
    },
    mfa_enabled:{
        type:Boolean,
        default:false
    },
    addresses:[{
        label:{
            type:String,
            required:true,
            trim:true
        },
         address:{
            type:String,
            required:true,
            trim:true
        },
         city:{
            type:String,
            required:true,
            trim:true
        },
         isDefault:{
            type:Boolean,
            default:false
        }
    }],
    paymentMethods:[{
        type:{
            type:String,
            enum:["card","wallet"],
            required:true
        },
        last4:{
            type:String,
            maxLLength:4
        },
        provider:{
            type:String,
            trim:true
        }
    }]
},
{
    timestamps:true
})

userSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
    
}



const user = mongoose.model("User",userSchema)

export default user