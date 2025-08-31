const mongoose = require('mongoose');
const config = require('./config');
const mongoURI = config.mongoURI;

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
