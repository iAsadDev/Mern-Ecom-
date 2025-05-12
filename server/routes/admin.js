const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const Order = require('../models/Order');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Product CRUD
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/products', upload.single('image'), async (req, res) => {
  const { title, category, originalPrice, salePrice, onSale } = req.body;
  const image = req.file ? req.file.filename : '';
  const product = new Product({ title, category, originalPrice, salePrice, onSale, image });
  await product.save();
  res.json(product);
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  const { title, category, originalPrice, salePrice, onSale } = req.body;
  const image = req.file ? req.file.filename : undefined;
  const updateFields = { title, category, originalPrice, salePrice, onSale };
  if (image) updateFields.image = image;

  const updated = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });
  res.json(updated);
});

router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('productId');
  res.json(orders);
});

router.post('/orders', async (req, res) => {
  const { productId, address } = req.body;
  const order = new Order({ productId, address });
  await order.save();
  res.json({ success: true });
});
router.put('/orders/:id/deliver', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { delivered: true },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark order as delivered" });
  }
});

module.exports = router;
