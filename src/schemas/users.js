const mongoose = require('mongoose')

// Define schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  created_at: Date,
  updated_at: { type: Date, default: Date.now() }
});

// Compile model from schema
const User = mongoose.model("User", userSchema);

module.exports = User