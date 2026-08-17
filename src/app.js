import express from "express";
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


    return router;
};


export default app;