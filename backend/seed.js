// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');  // ← ADD THIS!
const Product = require('./models/Product');
const Admin = require('./models/Admin');

dotenv.config();

// Function to create slug from name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

const products = [
  {
    name: 'Country Eggs',
    price: 450,
    image: 'https://images.pexels.com/photos/805469/pexels-photo-805469.jpeg',
    category: 'country',
    description: 'Free-range, naturally yellow yolks',
    longDescription: 'Our country eggs come from hens that roam freely in open pastures.',
    benefits: ['Rich in Omega-3', 'No antibiotics', 'Deep orange yolks'],
    nutritionInfo: 'Large eggs (50g). Contains 6g protein, 5g fat.',
    farmSource: 'Green Valley Farms',
    inStock: true,
    stockCount: 150,
    slug: createSlug('Country Eggs')
  },
  {
    name: '1 Desi Egg',
    price: 500,
    image: 'https://images.unsplash.com/photo-1635843125569-b7fb33d26fab?q=80&w=1170',
    category: 'desi',
    description: 'Pure village breed, high nutrition',
    longDescription: 'Desi eggs come from native Indian chicken breeds.',
    benefits: ['Higher protein', 'Rich flavor', 'Traditional breed'],
    nutritionInfo: 'Medium eggs (45g). Contains 7g protein, 5g fat.',
    farmSource: 'Heritage Village Farms',
    inStock: true,
    stockCount: 100,
    slug: createSlug('1 Desi Egg')
  },
  {
    name: 'Brown Farm Eggs',
    price: 350,
    image: 'https://images.pexels.com/photos/163037/egg-shell-food-cute-163037.jpeg',
    category: 'farm',
    description: 'Organic layer hens, large size',
    longDescription: 'Large brown eggs from organic-fed layer hens.',
    benefits: ['Large size', 'Consistent quality', 'Budget friendly'],
    nutritionInfo: 'Large eggs (50g). Contains 6g protein, 5g fat.',
    farmSource: 'Sunrise Layer Farm',
    inStock: false,
    stockCount: 0,
    slug: createSlug('Brown Farm Eggs')
  },
  {
    name: '30 Egg Tray Pack',
    price: 750,
    image: 'https://images.unsplash.com/photo-1648141499246-97a0eb56c2fd?q=80&w=735',
    category: 'tray',
    description: 'Perfect for families, mix variety',
    longDescription: 'Economical tray pack with a mix of our finest eggs.',
    benefits: ['Best value', 'Mixed variety', 'Eco-friendly tray'],
    nutritionInfo: 'Mixed sizes. Average 50g per egg.',
    farmSource: 'Mixed Village Farms',
    inStock: true,
    stockCount: 75,
    unit: 'tray',
    slug: createSlug('30 Egg Tray Pack')
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`✅ Added ${result.length} products`);

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@eggsupply.com' });

    if (!adminExists) {
      // Hash password manually
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      await Admin.create({
        email: 'admin@eggsupply.com',
        password: hashedPassword,  // ← NOW HASHED!
        name: 'Super Admin',
        role: 'superadmin'
      });
      console.log('✅ Created default admin with hashed password');
    } else {
      console.log('👤 Admin already exists');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Products: ${result.length}`);
    console.log(`   Admin: admin@eggsupply.com / admin123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();