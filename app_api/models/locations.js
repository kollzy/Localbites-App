const mongoose = require('mongoose');

// Define schemas
const openingTimeSchema = new mongoose.Schema({
  days: { type: String, required: true },
  opening: String,
  closing: String,
  closed: { type: Boolean, required: true },
});

const reviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviewText: String,
  createdOn: { type: Date, default: Date.now },
});

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }, 
  rating: { type: Number, default: 0, min: 0, max: 5 },
  facilities: [String],
  coords: { type: [Number], index: '2dsphere' },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema],
});

// Register and export model
const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
