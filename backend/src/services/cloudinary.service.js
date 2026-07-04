const cloudinary = require('../config/cloudinary');

// Streams an in-memory multer buffer straight to Cloudinary without
// touching disk. Returns { url, publicId } for storing on the document.
const uploadBuffer = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `skillforge/${folder}`, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });

const deleteAsset = (publicId) => {
  if (!publicId) return Promise.resolve();
  return cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadBuffer, deleteAsset };
