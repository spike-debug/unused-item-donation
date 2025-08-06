import mongoose from 'mongoose';

// Schema for each item in the cart
const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'Quantity cannot be less than 1'],
  },
});

// Schema for the entire cart
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One cart per user
  },
  items: [cartItemSchema],
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
