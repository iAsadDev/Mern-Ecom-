// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  oldPrice: String,
  salePrice: String,
  image: String,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
