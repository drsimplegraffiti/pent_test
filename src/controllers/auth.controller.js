const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const dataInfo = {
      status: 'success',
      message: 'User created successfully',
    };
    return res.status(201).json(dataInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user._id };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('access_token', token);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
