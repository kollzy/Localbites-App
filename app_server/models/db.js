const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

// The connection URI from the .env file 
const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongoose is connected');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

module.exports = connectDB;
