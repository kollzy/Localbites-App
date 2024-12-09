const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
