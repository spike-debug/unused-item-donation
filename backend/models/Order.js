import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],

  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // 'pending', 'completed', 'cancelled'

  paymentMethod: { type: String, default: 'Cash on Delivery' }, // Add this for frontend compatibility

  shippingAddress: {
    street: { type: String, required: true },     // changed from addressLine1
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },     // renamed from zip
    country: { type: String, required: true },
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
