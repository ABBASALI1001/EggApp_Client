// server.js - Complete backend in one file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Import models
const Product = require('./models/Product');
const Admin = require('./models/Admin');

// Import middleware
const auth = require('./middleware/auth');
const upload = require('./middleware/upload');

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://eggapp-client.onrender.com/api'],
  credentials: true
}));

// Create uploads folder if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ============================================
// DATABASE CONNECTION
// ============================================
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');

    // Create default admin if none exists
    // Create default admin if none exists
    try {
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        await Admin.create({
          email: process.env.ADMIN_EMAIL || 'admin@eggsupply.com',
          password: process.env.ADMIN_PASSWORD || 'admin123',
          name: 'Super Admin',
          role: 'superadmin'
        });
        console.log('✅ Default admin created');
      } else {
        console.log('👤 Admin already exists');
      }
    } catch (error) {
      console.error('❌ Error creating admin:', error.message);
    }
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ============================================
// PUBLIC ROUTES (No Auth Required)
// ============================================

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET product by slug
app.get('/api/products/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// ADMIN AUTH ROUTES
// ============================================

// Admin login
// app.post('/api/admin/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and password'
//       });
//     }

//     // Find admin by email
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Check password
//     const isMatch = await admin.comparePassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Update last login
//     admin.lastLogin = new Date();
//     await admin.save();

//     // Create JWT token
//     const token = jwt.sign(
//       { id: admin._id, email: admin.email, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRE || '7d' }
//     );

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// });

// Admin login - FIXED VERSION
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔑 Login attempt for:', email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log('❌ Admin not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Admin found, comparing password...');

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Password matched!');

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Verify admin token
app.get('/api/admin/verify', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// ADMIN PROTECTED ROUTES (Auth Required)
// ============================================

// GET all products for admin
app.get('/api/admin/products', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching admin products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// CREATE new product
// app.post('/api/admin/products', auth, async (req, res) => {
//   try {
//     const { name, price, category, description, image, inStock, stockCount, farmSource } = req.body;

//     // Validate required fields
//     if (!name || !price || !category || !description || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields'
//       });
//     }

//     const product = new Product({
//       name,
//       price,
//       category,
//       description,
//       image,
//       inStock: inStock !== undefined ? inStock : true,
//       stockCount: stockCount || 100,
//       farmSource: farmSource || 'Local Village Farm'
//     });

//     await product.save();

//     res.status(201).json({
//       success: true,
//       message: 'Product created successfully',
//       product
//     });
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// });
// CREATE new product - FIXED VERSION
// app.post('/api/admin/products', auth, async (req, res) => {
//   try {
//     const { name, price, category, description, image, inStock, stockCount, farmSource } = req.body;

//     console.log('📦 Creating product:', { name, price, category }); // Debug log

//     // Validate required fields
//     if (!name || !price || !category || !description || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields'
//       });
//     }

//     // Create slug from name
//     const slug = name
//       .toLowerCase()
//       .replace(/[^\w\s]/g, '')
//       .replace(/\s+/g, '-');

//     const product = new Product({
//       name,
//       price: Number(price),
//       category,
//       description,
//       image,
//       slug,  // ← ADD THIS!
//       inStock: inStock !== undefined ? inStock : true,
//       stockCount: stockCount || 100,
//       farmSource: farmSource || 'Local Village Farm'
//     });

//     await product.save();
//     console.log('✅ Product created:', product._id);

//     res.status(201).json({
//       success: true,
//       message: 'Product created successfully',
//       product
//     });
//   } catch (error) {
//     console.error('❌ Error creating product:', error); // This will show in backend console
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server error'
//     });
//   }
// });
// CREATE new product - DEBUG VERSION
app.post('/api/admin/products', auth, async (req, res) => {
  try {
    const { name, price, category, description, image, inStock, stockCount, farmSource } = req.body;

    console.log('📦 RECEIVED PRODUCT DATA:', {
      name,
      price,
      category,
      description,
      image,
      inStock,
      stockCount,
      farmSource
    });

    // Validate required fields
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    if (!price) return res.status(400).json({ success: false, message: 'Price is required' });
    if (!category) return res.status(400).json({ success: false, message: 'Category is required' });
    if (!description) return res.status(400).json({ success: false, message: 'Description is required' });
    if (!image) return res.status(400).json({ success: false, message: 'Image is required' });

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');

    console.log('🔤 Generated slug:', slug);

    const product = new Product({
      name,
      price: Number(price),
      category,
      description,
      image,
      slug,
      inStock: inStock !== undefined ? inStock : true,
      stockCount: stockCount || 100,
      farmSource: farmSource || 'Local Village Farm'
    });

    console.log('📝 Product object before save:', product);

    await product.save();
    console.log('✅ Product saved with ID:', product._id);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('❌ ERROR CREATING PRODUCT:', error);
    console.error('❌ ERROR NAME:', error.name);
    console.error('❌ ERROR MESSAGE:', error.message);
    console.error('❌ ERROR STACK:', error.stack);

    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate key error: A product with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});
// UPDATE product
app.put('/api/admin/products/:id', auth, async (req, res) => {
  try {
    const { name, price, category, description, image, inStock, stockCount, farmSource } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (description) product.description = description;
    if (image) product.image = image;
    if (inStock !== undefined) product.inStock = inStock;
    if (stockCount) product.stockCount = stockCount;
    if (farmSource) product.farmSource = farmSource;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// DELETE product
app.delete('/api/admin/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// UPLOAD image to Cloudinary
app.post('/api/admin/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'eggsupply/products',
      transformation: [
        { width: 500, height: 500, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Error uploading image:', error);

    // Try to delete local file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    });
  }
});

// BULK IMPORT products (optional - for seeding)
app.post('/api/admin/products/bulk', auth, async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of products'
      });
    }

    const created = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: `${created.length} products created successfully`,
      products: created
    });
  } catch (error) {
    console.error('Error bulk creating products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// SEED DEFAULT PRODUCTS (for testing)
// ============================================
app.post('/api/admin/seed', auth, async (req, res) => {
  try {
    // Check if products already exist
    const count = await Product.countDocuments();

    if (count > 0) {
      return res.json({
        success: true,
        message: 'Products already exist in database',
        count
      });
    }

    const defaultProducts = [
      {
        name: 'Country Eggs',
        price: 12.50,
        image: 'https://images.pexels.com/photos/805469/pexels-photo-805469.jpeg',
        category: 'country',
        description: 'Free-range, naturally yellow yolks',
        longDescription: 'Our country eggs come from hens that roam freely in open pastures, feeding on natural grains, insects, and greens.',
        benefits: ['Rich in Omega-3', 'No antibiotics', 'Deep orange yolks'],
        farmSource: 'Green Valley Farms',
        stockCount: 150
      },
      {
        name: 'Desi Eggs',
        price: 14.00,
        image: 'https://images.pexels.com/photos/161247/chicken-hen-poultry-farm-161247.jpeg',
        category: 'desi',
        description: 'Pure village breed, high nutrition',
        longDescription: 'Desi eggs come from native Indian chicken breeds raised in traditional village settings.',
        benefits: ['Higher protein', 'Rich flavor', 'Traditional breed'],
        farmSource: 'Heritage Village Farms',
        stockCount: 100
      },
      {
        name: 'Brown Farm Eggs',
        price: 10.00,
        image: 'https://images.pexels.com/photos/163037/egg-shell-food-cute-163037.jpeg',
        category: 'farm',
        description: 'Organic layer hens, large size',
        longDescription: 'Large brown eggs from organic-fed layer hens. Perfect for daily use.',
        benefits: ['Large size', 'Consistent quality', 'Budget friendly'],
        farmSource: 'Sunrise Layer Farm',
        stockCount: 200
      },
      {
        name: '30 Egg Tray Pack',
        price: 22.00,
        image: 'https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg',
        category: 'tray',
        description: 'Perfect for families, mix variety',
        longDescription: 'Economical tray pack with a mix of our finest eggs. Ideal for families.',
        benefits: ['Best value', 'Mixed variety', 'Eco-friendly tray'],
        farmSource: 'Mixed Village Farms',
        stockCount: 75,
        unit: 'tray'
      }
    ];

    const products = await Product.insertMany(defaultProducts);

    res.status(201).json({
      success: true,
      message: `${products.length} default products created`,
      products
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ============================================
// HEALTH CHECK ROUTE
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EggSupply API is running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB'
      });
    }
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
  console.log(`🔑 Admin login at http://localhost:${PORT}/api/admin/login`);
  console.log(`🌿 Environment: ${process.env.NODE_ENV || 'development'}`);
});
