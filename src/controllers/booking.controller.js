const Booking = require('../models/booking.model');
const User = require('../models/user.model');

// Create a new Booking
exports.createBooking = async (req, res, next) => {
  const { apartmentId, startDate, endDate } = req.body;
  try {
    const id = req.user.id;

    const checkUser = await User.findById(id);
    if (!checkUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const booking = await Booking.create({
      apartmentId,
      user: checkUser._id,
      startDate,
      endDate,
    });
    return res.status(201).json({
      message: 'Booking created successfully',
      booking: booking,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
