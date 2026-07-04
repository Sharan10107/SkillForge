const multer = require('multer');
const ApiError = require('../utils/ApiError');

// Files are held in memory only long enough to stream to Cloudinary;
// nothing is ever written to local disk.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new ApiError(400, 'Unsupported file type'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

module.exports = upload;
