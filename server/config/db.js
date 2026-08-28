const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the URI from the environment.
 * Exits the process on failure so the server does not run without a database.
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is not set. Add it to server/.env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
