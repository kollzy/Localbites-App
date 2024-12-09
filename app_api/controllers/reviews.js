const mongoose = require('mongoose');
const Location = mongoose.model('Location');

const reviewsCreate = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationid);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    location.reviews.push(req.body);
    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(400).json(err);
  }
};

const reviewsReadOne = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationid).exec();
    if (!location || !location.reviews.id(req.params.reviewid)) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(location.reviews.id(req.params.reviewid));
  } catch (err) {
    res.status(400).json(err);
  }
};

const reviewsUpdateOne = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationid).exec();
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const review = location.reviews.id(req.params.reviewid);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    Object.assign(review, req.body);
    const savedLocation = await location.save();
    res.status(200).json(savedLocation);
  } catch (err) {
    res.status(400).json(err);
  }
};

const reviewsDeleteOne = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationid).exec();
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const review = location.reviews.id(req.params.reviewid);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.remove();
    const savedLocation = await location.save();
    res.status(204).json(savedLocation);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};
