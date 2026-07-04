const { body } = require('express-validator');

const updateProfileRules = [
  body('name').optional().trim().isLength({ max: 80 }),
  body('headline').optional().trim().isLength({ max: 120 }),
  body('bio').optional().trim().isLength({ max: 600 }),
  body('skills').optional().isArray(),
];

module.exports = { updateProfileRules };
