const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;



const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  emailVerification: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    const salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha256').toString('hex');
  }
  next();
});

userSchema.methods.checkPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.password.slice(0, 32), 1000, 64, 'sha256').toString('hex');
  return hash === this.password.slice(32);
};

const User = mongoose.model('User', userSchema);

module.exports = User;




// COMMENTS

// In this example, checkPassword() is a method that accepts a password as an argument, 
// hashes it using the same algorithm and salt used to hash the password during the document's 
// creation, and compares the result to the stored hash. It returns true if the password is correct,
// and false otherwise.

// To check a user's password in your application code, you can use the checkPassword() method like this:

// const user = await User.findOne({ username: 'alice' });
// const isMatch = user.checkPassword('password123');
// if (isMatch) {
//   // password is correct
// } else {
//   // password is incorrect
// }
