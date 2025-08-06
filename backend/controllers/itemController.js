import Item from "../models/Item.js";
import AppError from '../utils/AppError.js';
import { validationResult } from "express-validator";


export const createItem = async (req, res) => {
  try {
    const {
  name,
  description,
  category,
  status,
  price,
  offerPrice,
  rating
} = req.body;

const imageUrl = req.file?.path || ""; // get Cloudinary image URL

const newItem = new Item({
  name,
  description,
  category,
  imageUrl,
  status,
  price,
  offerPrice,
  rating
});


    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error while creating item" });
  }
};


// GET /api/items
export const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// GET /api/items/:id
export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return next(new AppError("Item not found", 404));
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// PUT /api/items/:id
export const updateItem = async (req, res, next) => {
  try {
    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array().map(err => err.msg).join(', '), 400));
    }

    const { name, description, category, status } = req.body;
    const imageUrl = req.file?.path;

    const updatedFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(category && { category }),
      ...(status && { status }),
    };

    if (imageUrl) {
      updatedFields.imageUrl = imageUrl;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return next(new AppError("Item not found", 404));
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/items/:id
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return next(new AppError("Item not found", 404));
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
