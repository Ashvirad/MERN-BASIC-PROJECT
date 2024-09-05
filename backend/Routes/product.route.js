import express from "express";
import mongoose from "mongoose";// now not required here 
import Product from "../Models/product.model.js";// now not required here 
import { getAllProducts,createProduct,updateProduct,deleteProduct } from "../Controllers/product.crontroller.js";

const router= express.Router();


router.get("/",getAllProducts);

router.post("/",createProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

export default router;