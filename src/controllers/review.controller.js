const Apartment = require('../models/apartment.model');
const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Review = require('../models/review.model');
const cloudinary = require('../utils/cloudinary');

// Post review
exports.postReview = async (req, res, next) => {
  const { apartmentId, rating, landlord_rating, image, quality_of_amenities } =
    req.body;
  try {
    const id = req.user.id;

    const checkUser = await User.findById(id);
    if (!checkUser) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const checkBooking = await Booking.findOne({
      user: id,
      apartmentId,
    });

    if (!checkBooking) {
      return res.status(400).json({
        message: 'You have not booked this apartment',
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const review = await Review.create({
      apartmentId,
      rating,
      image: result.secure_url,
      quality_of_amenities,
      landlord_rating,
      user: checkUser._id,
    });

    return res.status(201).json({
      message: 'Review created',
      review,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Mark review as helpful
exports.markHelpful = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(400).json({
        message: 'Review not found',
      });
    }

    // increment review helpful
    review.helpful += 1;
    await review.save();

    return res.status(200).json({
      message: 'Review marked as helpful',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Sort review based on the most helpful(by count) or most recent.
exports.sortReview = async (req, res, next) => {
  const { helpful } = req.query;
  try {
    const reviews = await Review.find({ helpful: helpful }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: 'Reviews sorted',
      reviews,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
