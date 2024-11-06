const mongoose = require('mongoose');
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
