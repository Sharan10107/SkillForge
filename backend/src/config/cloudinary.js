const cloudinary = require('cloudinary').v2;
const { cloudinary: cfg } = require('./env');

cloudinary.config({
  cloud_name: cfg.cloudName,
  api_key: cfg.apiKey,
  api_secret: cfg.apiSecret,
});

module.exports = cloudinary;
