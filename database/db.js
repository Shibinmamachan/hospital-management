const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   await mongoose.connect('mongodb://127.0.0.1:27017/hospital_db', {

      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
