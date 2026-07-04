const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/projects', require('./project.routes'));
router.use('/comments', require('./comment.routes'));
router.use('/bookmarks', require('./bookmark.routes'));
router.use('/notifications', require('./notification.routes'));
router.use('/uploads', require('./upload.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/contact', require('./contact.routes'));

module.exports = router;
