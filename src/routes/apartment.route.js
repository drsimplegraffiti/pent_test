const express = require('express');
const { createApartment } = require('../controllers/apartment.controller');
const { isAuth } = require('../middlewares/is_auth');

const router = express.Router();

router.post('/', isAuth, createApartment);

module.exports = router;
