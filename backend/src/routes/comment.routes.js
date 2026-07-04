const router = require('express').Router();
const { updateComment, deleteComment } = require('../controllers/comment.controller');
const { protect } = require('../middlewares/auth.middleware');

router.patch('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;
