const express = require('express');
const router = express.Router();
const { registerBrand, loginBrand } = require('../controllers/authController');

router.post('/register', registerBrand);
router.post('/login', loginBrand);

module.exports = router;
