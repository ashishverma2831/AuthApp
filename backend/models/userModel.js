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
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    unique: [true, 'Email already exists'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'],
    trim: true,
    select: false, // Exclude password from query results by default
  },
});

module.exports = model('User', userSchema);