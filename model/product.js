const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, default: "No Discription" },
  price: { type: Number, required: true },
  discountPercentage: Number,
  rating: {
    type: Number,
    min: [0, "Enter valid rating"],
    max: [5, "Enter valid rating"],
    default: 0,
  },
  brand: String,
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: {type: [String], default: "Images Not Avilable"},
});

exports.Product = mongoose.model("Product", productSchema);
