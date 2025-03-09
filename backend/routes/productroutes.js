import express from 'express';
import Product from '../models/productModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', protect, async (req, res) => {
  const reviews = await Product.find({})
    .sort({ createdAt: -1 })
    .populate('userId', 'username'); // Add this line to populate user information
  res.json(reviews);
});

router.post('/', protect, async (req, res) => {
  const reviewData = {
    ...req.body,
    userId: req.userId
  };
  const newReview = new Product(reviewData);
  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Product.findById(id);
    if (review.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }
    const updatedReview = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(404).json({ message: "Review not found" });
  }
});

router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Product.findById(id);
    if (review.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: "Review not found" });
  }
});

router.get('/myreviews', protect, async (req, res) => {
  try {
    const reviews = await Product.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;