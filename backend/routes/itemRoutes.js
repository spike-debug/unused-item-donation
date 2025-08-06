// routes/itemRoutes.js
import express from 'express';
import parser from '../middleware/upload.js';
import verifyToken from '../middleware/verifyToken.js';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';

import { body } from 'express-validator';

const router = express.Router();

// POST: Create a new item
router.post(
  '/',
  verifyToken,
  parser.single('image'),
  [
    body('name').notEmpty().withMessage('Item name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createItem
);

// GET: All items
router.get('/', getAllItems);

// ⚠️ MOVE THIS LAST: GET item by ID
router.get('/:id', getItemById);

// PUT: Update item
router.put(
  '/:id',
  verifyToken,
  parser.single('image'),
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  ],
  updateItem
);

// DELETE: Delete item
router.delete('/:id', verifyToken, deleteItem);

export default router;
