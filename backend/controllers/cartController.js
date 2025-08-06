import Cart from '../models/Cart.js';

// Add or increase item in cart

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) return res.status(400).json({ message: 'Item ID is required' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItemIndex = cart.items.findIndex(i => i.item.toString() === itemId);

    if (existingItemIndex > -1) {
      // 🔁 Replace quantity with new one
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get cart for current user
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.item');

    if (!cart) return res.status(200).json({ products: [] });

    const formatted = cart.items.map(({ item, quantity }) => ({
      _id: item._id,
      name: item.name || 'Unnamed',
      description: item.description || 'No description',
      category: item.category || 'General',
      price: item.price || 0,
      offerPrice: item.offerPrice || 0,
      image: item.imageUrl || '',
      quantity,
      size: item.size || 42,
    }));

    res.status(200).json({ products: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quantity or remove item if quantity is 0
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(i => i.item.toString() === itemId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity < 1) {
      // Remove item if quantity is 0
      cart.items = cart.items.filter(i => i.item.toString() !== itemId);
    } else {
      // Otherwise update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove specific item from cart
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const newItems = cart.items.filter(i => i.item.toString() !== itemId);
    if (newItems.length === cart.items.length) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items = newItems;
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
