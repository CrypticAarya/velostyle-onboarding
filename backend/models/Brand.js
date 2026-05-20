const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ['Draft', 'Pending Review', 'Approved', 'Rejected', 'Needs More Information'],
    default: 'Draft',
  },
  profileCompletion: {
    type: Number,
    default: 0,
  },
  onboardingStep: {
    type: Number,
    default: 1,
  },
  onboardingData: {
    // Step 1: Brand Identity
    brandName: String,
    founderName: String,
    brandCategory: String,
    brandStory: String,
    brandLogoUrl: String,
    
    // Step 2: Business Details
    gstNumber: String,
    businessType: String,
    mfgScale: String,
    city: String,
    state: String,
    address: String,
    
    // Step 3: Product Information
    subCategories: String,
    pricePoint: String,
    inventorySize: String,
    sampleProducts: String,
    productImageUrls: [String],
    
    // Step 4: Delivery & Operations
    deliveryZones: String,
    sameday: String,
    packaging: String,
    returnPolicy: String,
  }
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
