const mongoose = require('mongoose');
const { mongoUri } = require('./env');

// Connects to MongoDB Atlas once at boot. Mongoose buffers commands
// internally so route handlers never need to await this directly.
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[db] Connection failed: ${err.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.warn('[db] MongoDB disconnected');
});

module.exports = connectDB;
