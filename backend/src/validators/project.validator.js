const { body } = require('express-validator');
const { PROJECT_CATEGORIES } = require('../config/constants');

const projectRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 120 }),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 5000 }),
  body('category').isIn(PROJECT_CATEGORIES).withMessage('Invalid category'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('githubUrl').optional({ checkFalsy: true }).isURL().withMessage('Enter a valid GitHub URL'),
  body('liveUrl').optional({ checkFalsy: true }).isURL().withMessage('Enter a valid live URL'),
];

module.exports = { projectRules };
