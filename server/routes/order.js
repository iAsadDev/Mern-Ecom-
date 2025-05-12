const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Place Order
router.post('/place', async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const newOrder = new Order({
      userId,
      items: cart.items,
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Order failed', error });
  }
});

module.exports = router;
