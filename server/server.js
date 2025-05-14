const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path')
// Initialize Express app
const app = express();
// Configuration
const JWT_SECRET = 'supersecurekey987';
const ADMIN = {
  username: 'admin',
  passwordHash: bcrypt.hashSync('admin123', 10)
};
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect('mongodb+srv://asad:asad@app.u6qfi.mongodb.net/kitchen?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const BlogPost = require('./models/Blog');

// Utility Functions
const handleServerError = (res, error, context) => {
  console.error(`❌ Error in ${context}:`, error);
  res.status(500).json({ message: 'Server error', error: error.message });
};

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authorization required' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ valid: false, message: 'Invalid token' });
  }
};

// ========== Routes ==========

// Admin Routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username !== ADMIN.username || !(await bcrypt.compare(password, ADMIN.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    handleServerError(res, error, 'admin login');
  }
});

app.get('/api/admin/verify', authenticate, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    handleServerError(res, error, 'fetching products');
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, category, oldPrice, salePrice } = req.body;
    const product = new Product({
      title,
      category,
      oldPrice,
      salePrice,
      image: req.file?.filename || ''
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    handleServerError(res, error, 'creating product');
  }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    handleServerError(res, error, 'updating product');
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    handleServerError(res, error, 'deleting product');
  }
});

// Order Routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('productId');
    res.json(orders);
  } catch (error) {
    handleServerError(res, error, 'fetching orders');
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { delivered: req.body.delivered },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    handleServerError(res, error, 'updating order');
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    handleServerError(res, error, 'deleting order');
  }
});

// Blog Routes
app.get('/api/blogposts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    handleServerError(res, error, 'fetching blog posts');
  }
});

app.post('/api/blogposts', upload.single('image'), async (req, res) => {
  try {
    const post = new BlogPost({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      image: req.file?.filename || ''
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    handleServerError(res, error, 'creating blog post');
  }
});

app.put('/api/blogposts/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    handleServerError(res, error, 'updating blog post');
  }
});
// Example Express route
app.get('/api/blogposts/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/blogposts/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    handleServerError(res, error, 'deleting blog post');
  }
});

// Cart Routes
app.get('/api/cart', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.username }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (error) {
    handleServerError(res, error, 'fetching cart');
  }
});

app.post('/api/cart', authenticate, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user.username });

    if (!cart) {
      cart = new Cart({ user: req.user.username, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product').execPopulate();
    res.json(cart);
  } catch (error) {
    handleServerError(res, error, 'updating cart');
  }
});

app.delete('/api/cart/:productId', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.username });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    handleServerError(res, error, 'removing from cart');
  }
});

// Email Route
app.post('/api/send', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'malikasad0155@gmail.com',
        pass: 'jjbj tufs tqzg nrtw'
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'i.am.asad586@gmail.com',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    handleServerError(res, error, 'sending email');
  }
});
app.get('/', (req, res) =>{
  res.send({activeStatus:true,
            error:false, })
})

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
