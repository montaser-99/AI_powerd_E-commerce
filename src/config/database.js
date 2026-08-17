import mongoose from "mongoose"
export const databaseConnection = async ()=>{
    const databaseUrl = process.env.DATABASE_URL
    try {
        await mongoose.connect(databaseUrl,{
            maxPoolSize : process.env.MAX_POOL_SIZE,
            serverSelectionTimeoutMS : process.env.SERVER_TIMEOUT
        })
        console.log("✅ MONGO DATABASE IS CONNECTED !")
    } catch (databaseError) {
        console.log(" ❌ ERROR IN MONOG DB : ",databaseError)
    }
}
