import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', placeOrder);
router.get('/', getUserOrders);

export default router;
