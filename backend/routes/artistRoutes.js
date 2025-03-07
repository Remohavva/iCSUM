import express from 'express';
import Artist from '../models/artistModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new artist (protected route)
router.post('/', protect, async (req, res) => {
  try {
    const { name, photoUrl, description } = req.body;
    const artist = await Artist.create({
      name,
      photoUrl,
      description
    });
    res.status(201).json(artist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;