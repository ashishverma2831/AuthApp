const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { clearAuthCookies, createTokens, setAuthCookies } = require('../utils/authTokens');
const createHttpError = require('../utils/httpError');

const SALT_ROUNDS = 12;

function normalizeEmail(email) {
  return email?.trim().toLowerCase();
}

function toPublicUser(user) {
  const { password, ...publicUser } = user.toObject();
  return publicUser;
}

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!username?.trim() || !normalizedEmail || !password) {
    throw createHttpError(400, 'Username, email, and password are required');
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw createHttpError(409, 'An account with this email already exists');
  }

  const user = await User.create({
    username: username.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, SALT_ROUNDS),
  });

  return res.status(201).json({
    message: 'User registered successfully',
    user: toPublicUser(user),
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw createHttpError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  const isPasswordValid = user && await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  setAuthCookies(res, createTokens(user._id));
  return res.status(200).json({ message: 'Login successful', user: toPublicUser(user) });
}

async function getUserProfile(req, res) {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return res.status(200).json({ user: toPublicUser(user) });
}

async function updateUserProfile(req, res) {
  const { username, email, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (username !== undefined) {
    if (!username.trim()) {
      throw createHttpError(400, 'Username cannot be empty');
    }
    user.username = username.trim();
  }

  if (email !== undefined) {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      throw createHttpError(400, 'Email cannot be empty');
    }

    const emailOwner = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
    if (emailOwner) {
      throw createHttpError(409, 'An account with this email already exists');
    }
    user.email = normalizedEmail;
  }

  if (newPassword !== undefined) {
    if (!currentPassword) {
      throw createHttpError(400, 'Current password is required to set a new password');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw createHttpError(401, 'Current password is incorrect');
    }
    user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
  }

  await user.save();
  return res.status(200).json({
    message: 'Profile updated successfully',
    user: toPublicUser(user),
  });
}

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token is required');
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    clearAuthCookies(res);
    throw createHttpError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(payload.id);
  if (!user) {
    clearAuthCookies(res);
    throw createHttpError(401, 'User account no longer exists');
  }

  setAuthCookies(res, createTokens(user._id));
  return res.status(200).json({ message: 'Session refreshed' });
}

function logoutUser(req, res) {
  clearAuthCookies(res);
  return res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserProfile,
};
