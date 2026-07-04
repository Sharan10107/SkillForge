const router = require('express').Router();
const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notification.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', protect, getNotifications);
router.patch('/read-all', protect, markAllAsRead);
router.patch('/:id/read', protect, markAsRead);

module.exports = router;
