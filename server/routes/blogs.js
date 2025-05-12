// routes/blogs.js

const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Assume a Mongoose model for Blog

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog post
router.post('/', async (req, res) => {
  const { title, description, image } = req.body;
  const newBlog = new Blog({ title, description, image });

  try {
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
