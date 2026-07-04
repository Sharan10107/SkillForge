const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const { submitContactForm } = require('../controllers/contact.controller');

router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('message').trim().notEmpty().isLength({ max: 2000 }),
  ],
  validate,
  submitContactForm
);

module.exports = router;
