// backend/models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Admin'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'superadmin'
  },
  lastLogin: Date
}, {
  timestamps: true
});

// FIXED pre-save hook - handles both new and updated admins
adminSchema.pre('save', function (next) {
  console.log('🔄 Pre-save hook running');
  console.log('📝 Password modified:', this.isModified('password'));

  // Only hash if password is modified (new admin or password change)
  if (!this.isModified('password')) {
    console.log('⏭️ Password not modified, skipping hash');
    return;  // ← Make sure this return is here
  }

  console.log('🔐 Hashing password...');

  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log('❌ Salt error:', err);
      return next(err);
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        console.log('❌ Hash error:', err);
        return next(err);
      }

      this.password = hash;
      console.log('✅ Password hashed successfully');
      next();  // ← This must be here!
    });
  });
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('🔍 Comparing password...');
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);