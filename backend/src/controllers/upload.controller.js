const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/User.model');
const { uploadBuffer, deleteAsset } = require('../services/cloudinary.service');

// POST /api/uploads/avatar
const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file provided');

  const result = await uploadBuffer(req.file.buffer, 'avatars');
  if (req.user.avatarPublicId) await deleteAsset(req.user.avatarPublicId);

  req.user.avatarUrl = result.url;
  req.user.avatarPublicId = result.publicId;
  await req.user.save();

  res.status(200).json(new ApiResponse(200, { avatarUrl: result.url }, 'Avatar updated'));
});

// POST /api/uploads/banner
const uploadBanner = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file provided');

  const result = await uploadBuffer(req.file.buffer, 'banners');
  if (req.user.bannerPublicId) await deleteAsset(req.user.bannerPublicId);

  req.user.bannerUrl = result.url;
  req.user.bannerPublicId = result.publicId;
  await req.user.save();

  res.status(200).json(new ApiResponse(200, { bannerUrl: result.url }, 'Banner updated'));
});

// POST /api/uploads/resume
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file provided');
  const result = await uploadBuffer(req.file.buffer, 'resumes');
  req.user.resumeUrl = result.url;
  await req.user.save();
  res.status(200).json(new ApiResponse(200, { resumeUrl: result.url }, 'Resume uploaded'));
});

// POST /api/uploads/project-image  -> returns url/publicId only;
// caller attaches it to a project's gallery/coverImage.
const uploadProjectImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file provided');
  const result = await uploadBuffer(req.file.buffer, 'projects');
  res.status(200).json(new ApiResponse(200, result, 'Image uploaded'));
});

module.exports = { uploadAvatar, uploadBanner, uploadResume, uploadProjectImage };
