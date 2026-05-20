const Brand = require('../models/Brand');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new brand
// @route   POST /api/auth/register
// @access  Public
const registerBrand = async (req, res) => {
  try {
    const { email, password } = req.body;

    const brandExists = await Brand.findOne({ email });

    if (brandExists) {
      return res.status(400).json({ message: 'Brand already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create brand
    const brand = await Brand.create({
      email,
      password: hashedPassword,
      onboardingData: {}
    });

    if (brand) {
      res.status(201).json({
        _id: brand._id,
        email: brand.email,
        token: generateToken(brand._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid brand data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a brand
// @route   POST /api/auth/login
// @access  Public
const loginBrand = async (req, res) => {
  try {
    const { email, password } = req.body;

    const brand = await Brand.findOne({ email });

    if (brand && (await bcrypt.compare(password, brand.password))) {
      res.json({
        _id: brand._id,
        email: brand.email,
        onboardingStep: brand.onboardingStep,
        token: generateToken(brand._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerBrand,
  loginBrand,
};
