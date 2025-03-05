import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  songTitle: { type: String, required: true },
  artist: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  genre: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);