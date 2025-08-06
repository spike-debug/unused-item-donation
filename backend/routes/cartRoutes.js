import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem
} from '../controllers/cartController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// ✅ Protect all cart routes
router.use(verifyToken);

// ✅ Get current user's cart
router.get('/', getCart);

// ✅ Add item to cart
router.post('/', addToCart);

// ✅ Update quantity of an item in the cart
router.put('/:itemId', updateCartItem);

// ✅ Remove an item from the cart
router.delete('/:itemId', removeCartItem);

export default router;
