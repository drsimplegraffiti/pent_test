const express = require('express');
const { createBooking } = require('../controllers/booking.controller');
const { isAuth } = require('../middlewares/is_auth');

const router = express.Router();

// create booking
router.post('/create', isAuth, createBooking);

module.exports = router;
