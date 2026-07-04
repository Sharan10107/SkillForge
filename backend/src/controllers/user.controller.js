const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/User.model');
const slugify = require('slugify');

const ALLOWED_FIELDS = [
  'name', 'headline', 'bio', 'location', 'skills', 'socialLinks',
  'education', 'experience', 'certificates', 'achievements', 'isPublic',
];

// PATCH /api/users/me
const updateProfile = asyncHandler(async (req, res) => {
  const updates = {};
  ALLOWED_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(new ApiResponse(200, { user: user.toPublicJSON() }, 'Profile updated'));
});

// GET /api/users/:slugOrId  -> public portfolio
const getPublicProfile = asyncHandler(async (req, res) => {
  const { slugOrId } = req.params;
  const query = slugOrId.match(/^[0-9a-fA-F]{24}$/) ? { _id: slugOrId } : { slug: slugOrId };

  const user = await User.findOne({ ...query, isPublic: true });
  if (!user) throw new ApiError(404, 'Profile not found');

  res.status(200).json(new ApiResponse(200, { user: user.toPublicJSON() }));
});

// Lazily assigns a unique public-profile slug the first time it's needed.
const ensureSlug = asyncHandler(async (req, res, next) => {
  if (!req.user.slug) {
    req.user.slug = `${slugify(req.user.name, { lower: true, strict: true })}-${req.user._id
      .toString()
      .slice(-5)}`;
    await req.user.save();
  }
  next();
});

// GET /api/users  (search, for exploring/inviting collaborators)
const searchUsers = asyncHandler(async (req, res) => {
  const { q = '' } = req.query;
  const filter = q
    ? { $text: { $search: q }, isPublic: true }
    : { isPublic: true };

  const users = await User.find(filter).limit(20).select('name headline avatarUrl slug skills');
  res.status(200).json(new ApiResponse(200, { users }));
});

module.exports = { updateProfile, getPublicProfile, ensureSlug, searchUsers };
