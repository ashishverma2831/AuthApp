const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],          
    pattern: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email' ],
    unique: [true, 'Email already exists'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    pattern: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'],
    trim: true,
  },
});

module.exports = model('User', userSchema);