const Apartment = require('../models/apartment.model');
const User = require('../models/user.model');

// create a new apartment
exports.createApartment = async (req, res, next) => {
  const { name, address, city, state, zip, price, bedrooms } = req.body;
  try {
    const id = req.user.id;

    const checkUser = await User.findById(id);
    if (!checkUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (checkUser.role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'You are not authorized to do this' });
    }

    const apartment = await Apartment.create({
      name,
      address,
      city,
      state,
      zip,
      price,
      bedrooms,
      admin: checkUser._id,
    });

    res.status(201).json({
      message: 'Apartment created successfully',
      apartment: apartment,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
