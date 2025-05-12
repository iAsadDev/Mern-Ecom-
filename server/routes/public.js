// routes/public.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Public route to get all products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
