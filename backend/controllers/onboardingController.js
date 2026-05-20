const Brand = require('../models/Brand');

const calculateCompletion = (data) => {
  if (!data) return 0;
  const expectedFields = [
    'brandName', 'founderName', 'brandCategory', 'brandStory', 
    'gstNumber', 'businessType', 'mfgScale', 'city', 'state', 'address',
    'subCategories', 'pricePoint', 'inventorySize', 'sampleProducts',
    'deliveryZones', 'sameday', 'packaging', 'returnPolicy'
  ];
  let filled = 0;
  expectedFields.forEach(field => {
    if (data[field] && data[field].trim() !== '') filled++;
  });
  return Math.round((filled / expectedFields.length) * 100);
};

// @desc    Get onboarding progress
// @route   GET /api/onboarding/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const brand = await Brand.findById(req.brandId).select('-password');
    
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    
    res.json({
      applicationStatus: brand.applicationStatus,
      profileCompletion: brand.profileCompletion,
      onboardingStep: brand.onboardingStep,
      onboardingData: brand.onboardingData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save onboarding progress
// @route   PUT /api/onboarding/progress
// @access  Private
const saveProgress = async (req, res) => {
  try {
    const { step, data, submit } = req.body;

    const brand = await Brand.findById(req.brandId);
    
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    // Update step if passed
    if (step) {
      brand.onboardingStep = step;
    }

    // Merge new data with existing data
    if (data) {
      brand.onboardingData = {
        ...brand.onboardingData.toObject(),
        ...data
      };
      // Recalculate completion
      brand.profileCompletion = calculateCompletion(brand.onboardingData);
    }

    // Handle submission
    if (submit) {
      brand.applicationStatus = 'Pending Review';
    }

    const updatedBrand = await brand.save();

    res.json({
      message: submit ? 'Application submitted successfully' : 'Progress saved successfully',
      applicationStatus: updatedBrand.applicationStatus,
      profileCompletion: updatedBrand.profileCompletion,
      onboardingStep: updatedBrand.onboardingStep,
      onboardingData: updatedBrand.onboardingData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgress,
  saveProgress,
};
