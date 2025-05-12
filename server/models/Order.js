const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  customerName: String,
  phone1: String,  // First phone number
  phone2: String,  // Second phone number
  address: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  delivered: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', orderSchema);
