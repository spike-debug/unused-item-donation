import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's cart and populate item details
    const cart = await Cart.findOne({ user: userId }).populate('items.item');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total price using item.price
    const totalPrice = cart.items.reduce((total, cartItem) => {
      const price = cartItem.item.price ?? 0;
      return total + price * cartItem.quantity;
    }, 0);

    const { shippingAddress, paymentMethod = 'Cash on Delivery' } = req.body;

    // Validate shipping address fields
    if (
      !shippingAddress ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipcode ||
      !shippingAddress.country
    ) {
      return res.status(400).json({ message: 'Incomplete shipping address' });
    }

    // Create and save the order
    const order = new Order({
      user: userId,
      items: cart.items.map(i => ({
        item: i.item._id,
        quantity: i.quantity,
      })),
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate('user', 'firstName lastName')         // For frontend address display
      .populate('items.item', 'name');                // For product info

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
