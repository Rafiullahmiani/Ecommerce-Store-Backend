import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./modules/product.js";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;
// Connecting to mongodb
const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Mongo DB Connected");
  } catch (err) {
    console.log(err);
  }
};

//  Get all products from mongodb
app.get("/products", async (req, res) => {
  try {
    const productsFromDB = await Product.find();
    res.status(200).json(productsFromDB);
  } catch (err) {
    res.status(500).json("Something Went Wrong");
  }
});

// Add Product Mongodb

app.post("/Products", async (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  try {
    const newDBProduct = new Product({
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      imageUrl: newProduct.imageUrl,
      desc: newProduct.desc,
    });
    await newDBProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something Went Wrong");
  }
});

//  Update product
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
try{
  await Product.findOneAndUpdate({id:id},{...updatedProduct});
  res.json("Successfully Update");
}catch(err){
res.status(500).json("Something went wrong");
}
});

// Delete product
app.delete("/Products/:id",async (req, res) => {
  const { id } = req.params;
  try{
    const deleteProduct=await Product.findOneAndDelete({id:id});
    if(deleteProduct){
      return res.status(200).json("Successfully Delete");
    }else{
      return res.status(404).json("Product not found");
    }
  }catch(err){
    res.status(500).json("Something went wrong");
  }
});

// Server start
ConnectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
