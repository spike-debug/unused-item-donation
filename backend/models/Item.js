import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  imageUrl: String,
  status: {
    type: String,
    enum: ["available", "requested", "claimed"],
    default: "available",
  },
  price: {
    type: Number,
    default: 0, // Default price is 0 (free)
  },
  offerPrice: {
    type: Number,
    default: 0, // If there is an offer/discounted price
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0, // Can be updated later with real ratings
  },
}, {
  timestamps: true,
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
