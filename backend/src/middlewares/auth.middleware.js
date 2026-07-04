const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User.model');
const { jwtSecret } = require('../config/env');

// Verifies the Bearer token, loads the user, and attaches it to req.user.
// Downstream handlers can then trust req.user without re-checking auth.
const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) throw new ApiError(401, 'Not authorized, no token provided');

  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new ApiError(401, 'Not authorized, token invalid or expired');
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, 'User belonging to this token no longer exists');
  if (user.isBanned) throw new ApiError(403, 'This account has been suspended');

  req.user = user;
  next();
});

module.exports = { protect };
