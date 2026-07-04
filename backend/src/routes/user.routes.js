const router = require('express').Router();
const { updateProfile, getPublicProfile, ensureSlug, searchUsers } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { updateProfileRules } = require('../validators/user.validator');

router.get('/', searchUsers);
router.patch('/me', protect, updateProfileRules, validate, ensureSlug, updateProfile);
router.get('/:slugOrId', getPublicProfile);

module.exports = router;
