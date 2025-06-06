import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
    details: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
