require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//mount routes
const authRoutes = require('./routes/auth.route');
const bookingRoutes = require('./routes/booking.route');
const apartmentRoutes = require('./routes/apartment.route');
const reviewRoutes = require('./routes/review.route');

const app = express();

//json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Health Check
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to Pent Service apartment 😀😀😀😀' });
});

//mount routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/apartment', apartmentRoutes);
app.use('/api/review', reviewRoutes);

// 404 Error Handler
app.use((req, res, next) => {
  const error = new Error(`${req.url} not Found 🤧`);
  error.status = 404;
  next(error);
});

// 500 Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next(error);
});

module.exports = app;
