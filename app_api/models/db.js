const mongoose = require('mongoose');

const connectDB = async () => {
  const dbUri = process.env.MONGO_URI;
  if (!dbUri) {
    console.error("MongoDB connection string (MONGO_URI) is undefined.");
    return;
  }

  try {
    const conn = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
    console.log(`Database in use: ${conn.connection.name}`); // Log the active database name
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;
