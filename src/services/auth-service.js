const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getZodiacSign, isValidEmail, isValidBirthdate } = require('../utils/utils');
const config = require('../config/config');

async function signup({ name, email, password, birthdate }) {
  if (!name || !email || !password || !birthdate) {
    const error = new Error('All fields are required');
    error.status = 400;
    throw error;
  }

  if (!isValidEmail(email)) {
    const error = new Error('Invalid email format');
    error.status = 400;
    throw error;
  }

  if (!isValidBirthdate(birthdate)) {
    const error = new Error('Invalid birthdate or underage');
    error.status = 400;
    throw error;
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    const error = new Error('Email already in use');
    error.status = 409;
    throw error;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Calculate zodiac sign
  const zodiac = getZodiacSign(birthdate);

  // Create user
  const user = new User({
    name,
    email: email.toLowerCase(),
    passwordHash,
    birthdate: new Date(birthdate),
    zodiac
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn || '7d'
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      zodiac: user.zodiac
    }
  };
}

async function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('Missing fields');
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn || '7d'
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, zodiac: user.zodiac }
  };
}

module.exports = { signup, login };
