import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    SKU: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      public_id: { type: String, require: true },
      secure_url: { type: String, require: true },
    },
    gender: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    likes: {
      type: Number,
      require: true,
    },
    category: String,
    color: String,
    createdAt: {
      type: String,
      default: new Date().toISOString()
    },
    updatedAt: {
      type: String,
      default: new Date().toISOString()
    },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
