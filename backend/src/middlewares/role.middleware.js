const ApiError = require('../utils/ApiError');

// Usage: router.get('/admin', protect, authorize('admin'), handler)
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, 'You do not have permission to perform this action');
  }
  next();
};

module.exports = { authorize };
