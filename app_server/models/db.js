// app_server/models/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  console.log("MongoDB URI:", mongoURI); 

  if (!mongoURI) {
    console.error("MongoDB connection string (MONGO_URI) is undefined.");
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
