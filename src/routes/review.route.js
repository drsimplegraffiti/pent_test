const express = require('express');
const router = express.Router();
const {
  postReview,
  sortReview,
  markHelpful,
} = require('../controllers/review.controller');
const { isAuth } = require('../middlewares/is_auth');
const upload = require('../utils/multer');

router.post('/', upload.single('image'), isAuth, postReview);

router.get('/all', sortReview);

router.put('/:reviewId', markHelpful);

module.exports = router;
