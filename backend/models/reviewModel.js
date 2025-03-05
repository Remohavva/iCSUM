import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  songTitle: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  genre: { type: String },
  releaseYear: { type: Number },
  reviewDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Review', reviewSchema);