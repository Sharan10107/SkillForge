const rateLimit = require('express-rate-limit');
const { rateLimit: cfg } = require('../config/env');

// General API limiter, applied globally in app.js.
const apiLimiter = rateLimit({
  windowMs: cfg.windowMs,
  max: cfg.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later' },
});

// Tighter limiter specifically for auth endpoints to slow down brute force.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many auth attempts, please try again later' },
});

module.exports = { apiLimiter, authLimiter };
