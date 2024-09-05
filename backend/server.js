//const express=require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './Models/product.model.js'; // now not required here 
import mongoose from 'mongoose';// now not required here 
import productRoutes from './Routes/product.route.js';
import path from "path";

dotenv.config();
//dotenv.config();
//console.log(process.env);  // This will print all the environment variables

const app = express();
const PORT =process.env.PORT || 5000;

const __dirname=path.resolve();

app.use(express.json());//allows us to accpect json data in req.body

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});

}
//console.log(process.env.MONGO_URI);
app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:"+PORT);
});
//hzdOMrJWYHp6YUmP