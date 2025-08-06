// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';
import { body } from 'express-validator';

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

// ✅ GET /api/auth/verify-token
router.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

export default router;
