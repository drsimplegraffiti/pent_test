const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    landlord_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    helpful: {
      type: Number,
      default: 0,
    },
    image: {
      type: [String],
      default: [],
    },
    quality_of_amenities: {
      type: String,
      enum: ['good', 'bad', 'average'],
    },
  },

  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
