import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  desc: {
    type: String,
  },
});
const Product = mongoose.model("products", ProductSchema);

export default Product;
