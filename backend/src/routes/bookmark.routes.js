const router = require('express').Router();
const { toggleBookmark, getMyBookmarks } = require('../controllers/bookmark.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/me', protect, getMyBookmarks);
router.post('/:projectId', protect, toggleBookmark);

module.exports = router;
