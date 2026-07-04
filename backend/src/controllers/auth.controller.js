const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/User.model');
const { signAccessToken } = require('../services/token.service');
const { generateToken, hashToken } = require('../utils/generateOTP');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/email.service');

// POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'An account with this email already exists');

  const verificationToken = generateToken();
  const user = await User.create({
    name,
    email,
    password,
    emailVerificationTokenHash: hashToken(verificationToken),
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
  });

  await sendVerificationEmail(user.email, verificationToken);

  const token = signAccessToken(user._id);
  res
    .status(201)
    .json(new ApiResponse(201, { token, user: user.toPublicJSON() }, 'Account created. Check your email to verify.'));
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (user.isBanned) throw new ApiError(403, 'This account has been suspended');

  const token = signAccessToken(user._id);
  res.status(200).json(new ApiResponse(200, { token, user: user.toPublicJSON() }, 'Logged in successfully'));
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user.toPublicJSON() }));
});

// POST /api/auth/verify-email
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashed = hashToken(token);

  const user = await User.findOne({
    emailVerificationTokenHash: hashed,
    emailVerificationExpires: { $gt: Date.now() },
  }).select('+emailVerificationTokenHash +emailVerificationExpires');

  if (!user) throw new ApiError(400, 'Verification link is invalid or has expired');

  user.isEmailVerified = true;
  user.emailVerificationTokenHash = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully'));
});

// POST /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always respond the same way whether or not the account exists,
  // so the endpoint can't be used to enumerate registered emails.
  if (user) {
    const resetToken = generateToken();
    user.passwordResetTokenHash = hashToken(resetToken);
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    await sendPasswordResetEmail(user.email, resetToken);
  }

  res.status(200).json(new ApiResponse(200, null, 'If that email exists, a reset link has been sent'));
});

// POST /api/auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashed = hashToken(token);

  const user = await User.findOne({
    passwordResetTokenHash: hashed,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+passwordResetTokenHash +passwordResetExpires');

  if (!user) throw new ApiError(400, 'Reset link is invalid or has expired');

  user.password = password;
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json(new ApiResponse(200, null, 'Password reset successfully. Please log in.'));
});

module.exports = { signup, login, getMe, verifyEmail, forgotPassword, resetPassword };
