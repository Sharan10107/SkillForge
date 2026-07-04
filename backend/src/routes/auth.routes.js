const router = require('express').Router();
const { signup, login, getMe, verifyEmail, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { authLimiter } = require('../middlewares/rateLimiter.middleware');
const {
  signupRules, loginRules, forgotPasswordRules, resetPasswordRules,
} = require('../validators/auth.validator');

router.post('/signup', authLimiter, signupRules, validate, signup);
router.post('/login', authLimiter, loginRules, validate, login);
router.get('/me', protect, getMe);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', authLimiter, forgotPasswordRules, validate, forgotPassword);
router.post('/reset-password', authLimiter, resetPasswordRules, validate, resetPassword);

module.exports = router;
