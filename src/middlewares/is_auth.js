const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token is missing' });

    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    console.log('====================================req.user');
    console.log(req.user);
    console.log('====================================req.user');

    next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: ' Token expired  --> ' + e.message });
  }
};
