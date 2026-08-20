import dotenv from 'dotenv'
import express from'express'
import mongoose from 'mongoose'
import authRouting from "./modules/authentication/authentication.routes.js";
import userRouting from "./modules/users/user.routes.js"
import subRouting from "./modules/subcategories/subcategory.routes.js"

dotenv.config();
const app = express()

app.use(express.json())
app.use("/auth",authRouting);
app.use("/user",userRouting);
app.use("/sub",subRouting)



export default app