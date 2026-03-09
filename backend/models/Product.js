// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    default: function () {
      return this.name ? this.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : null;
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['country', 'desi', 'farm', 'tray']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  longDescription: {
    type: String
  },
  benefits: [String],
  nutritionInfo: String,
  farmSource: String,
  inStock: {
    type: Boolean,
    default: true
  },
  stockCount: {
    type: Number,
    default: 100
  },
  unit: {
    type: String,
    default: 'dozen'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// FIXED pre-save hook
productSchema.pre('save', function (next) {
  console.log('📝 Product pre-save hook running');

  if (this.name) {
    this.slug = this.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    console.log('🔤 Generated slug:', this.slug);
  }

  // next();  // ← CRITICAL: Must call next()!
});

module.exports = mongoose.model('Product', productSchema);