const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const Bookmark = require('../models/Bookmark.model');
const { getPagination, buildMeta } = require('../utils/pagination');

// POST /api/bookmarks/:projectId  (toggle)
const toggleBookmark = asyncHandler(async (req, res) => {
  const existing = await Bookmark.findOne({ user: req.user._id, project: req.params.projectId });

  if (existing) {
    await existing.deleteOne();
    return res.status(200).json(new ApiResponse(200, { bookmarked: false }, 'Removed from bookmarks'));
  }

  await Bookmark.create({ user: req.user._id, project: req.params.projectId });
  res.status(201).json(new ApiResponse(201, { bookmarked: true }, 'Added to bookmarks'));
});

// GET /api/bookmarks/me
const getMyBookmarks = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { user: req.user._id };

  const [bookmarks, total] = await Promise.all([
    Bookmark.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'project', populate: { path: 'owner', select: 'name avatarUrl slug' } }),
    Bookmark.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { bookmarks, meta: buildMeta(page, limit, total) }));
});

module.exports = { toggleBookmark, getMyBookmarks };
