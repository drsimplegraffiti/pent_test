const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db =
      process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI_DEV
        : process.env.MONGO_URI_PROD;
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
