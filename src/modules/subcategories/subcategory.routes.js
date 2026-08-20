import express from "express";

import {createListController, renameListController, deleteListController,
   addProductToListController, removeProductFromListController,} from "./subcategory.controller.js";

import  auth  from "../../middlewares/authenticate.js";

const router = express.Router();

// Create List
router.post("/",auth,createListController);

// Rename List
router.patch("/:listId",auth,renameListController);

// Delete List
router.delete("/:listId",auth,deleteListController);

// Add Product
router.post("/:listId/products",auth,addProductToListController);

// Remove Product
router.delete("/:listId/products/:productId",auth,removeProductFromListController);

export default router;