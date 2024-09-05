import Product from "../Models/product.model.js";
import mongoose from "mongoose"


export const getAllProducts= async(req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json({sucess:true,data:products});
    } catch (error) {
        console.log("error in getting all products: ", error.message);
        res.status(500).json({sucess: false,message:"server Error"});
    }
}

export const createProduct=async (req,res)=>{
    const product=req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({sucess:false,message:"Please provide all feilds"});
    }
    const newProduct= new Product(product)

    try {
        await newProduct.save();
        res.status(200).json({sucess:true,data:newProduct});
    } catch (error) {
        console.error("Error in create new product: ", error.message);
        res.status(500).json({sucess:false,message:"server error"});
    }
}

export const updateProduct=async(req,res)=>{
    const {id}=req.params;
    const product=req.body;

     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({sucess:false,message:"product not found"});
     }
    try {
        const updatedProduct= await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({sucess:true,data:updatedProduct});
    } catch (error) {
        console.log("can't update product: ",error);
        res.status(500).json({sucess:false,message:"server error"});
    }
}

export const deleteProduct=async(req,res)=>{
    const{id}=req.params;
    console.log("id : ",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:false,message:"product not found"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:true,message:"product deleted"});
    } catch (error) {
        console.error("can't delete the product: ",error.message);
        res.status(500).json({sucess:false,message:"server error"});
    }
}