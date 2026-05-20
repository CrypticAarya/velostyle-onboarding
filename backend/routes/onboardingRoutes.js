const express = require('express');
const router = express.Router();
const { getProgress, saveProgress } = require('../controllers/onboardingController');
const { protect } = require('../middleware/auth');

router.route('/progress')
  .get(protect, getProgress)
  .put(protect, saveProgress);

module.exports = router;
