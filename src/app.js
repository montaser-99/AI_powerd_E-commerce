import express from "express";
import productRouting from "./modules/products/product.routes.js";
// import cartRouting from "./modules/cart/cart.routes.js";
import analyticsRouting from "./modules/analytics/analytics.routes.js";
import dotenv from "dotenv";
import { databaseConnection } from "./config/database.js";
import cookieParser from "cookie-parser";


export const app = () => {

    // Load environment variables
    dotenv.config();


    // Database connection
    databaseConnection();


    // Create express app
    const router = express();
    router.use(express.urlencoded({ extended: true }));


    // Global Middlewares
    router.use(express.json());
    router.use(cookieParser());
    // router.use("/uploads", express.static("uploads"));

    // Routes
    router.use("/product", productRouting);
    // router.use("/cart", cartRouting);
    router.use("/analytics", analyticsRouting);


    return router;
};


export default app;