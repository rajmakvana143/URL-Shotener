const mongoose = require("mongoose");

// Connect to MongoDB

async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectToMongoDB };
