import express from 'express';
import Product from '../models/productModel.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/artists', async (req, res) => {
  try {
    const artists = await Product.distinct('artist');
    res.json(artists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Protected routes - require authentication
router.get('/', protect, async (req, res) => {
  const reviews = await Product.find({}).sort({ createdAt: -1 });
  res.json(reviews);
});

router.get('/artist/:artistName', protect, async (req, res) => {
  try {
    const reviews = await Product.find({
      artist: { $regex: new RegExp(req.params.artistName, 'i') }
    });
    res.json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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
export default router;