const router = require('express').Router();
const upload = require('../middlewares/multer.middleware');
const { protect } = require('../middlewares/auth.middleware');
const {
  uploadAvatar, uploadBanner, uploadResume, uploadProjectImage,
} = require('../controllers/upload.controller');

router.post('/avatar', protect, upload.single('file'), uploadAvatar);
router.post('/banner', protect, upload.single('file'), uploadBanner);
router.post('/resume', protect, upload.single('file'), uploadResume);
router.post('/project-image', protect, upload.single('file'), uploadProjectImage);

module.exports = router;
