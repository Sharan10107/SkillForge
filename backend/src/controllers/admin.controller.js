const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/User.model');
const Project = require('../models/Project.model');
const Report = require('../models/Report.model');
const { getPagination, buildMeta } = require('../utils/pagination');
const { getOverview } = require('../services/analytics.service');
const { REPORT_STATUS } = require('../config/constants');

// GET /api/admin/analytics
const analytics = asyncHandler(async (req, res) => {
  const overview = await getOverview();
  res.status(200).json(new ApiResponse(200, overview));
});

// GET /api/admin/users
const listUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { q } = req.query;
  const filter = q ? { $text: { $search: q } } : {};

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { users, meta: buildMeta(page, limit, total) }));
});

// PATCH /api/admin/users/:id/ban
const toggleBanUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  if (user.role === 'admin') throw new ApiError(400, 'Cannot ban another admin');

  user.isBanned = !user.isBanned;
  await user.save();

  res.status(200).json(new ApiResponse(200, { isBanned: user.isBanned }, `User ${user.isBanned ? 'banned' : 'unbanned'}`));
});

// GET /api/admin/projects
const listProjectsForModeration = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = {};
  if (req.query.reported === 'true') filter.isReported = true;

  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('owner', 'name email'),
    Project.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { projects, meta: buildMeta(page, limit, total) }));
});

// PATCH /api/admin/projects/:id/feature
const toggleFeatureProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  project.isFeatured = !project.isFeatured;
  await project.save();

  res.status(200).json(new ApiResponse(200, { isFeatured: project.isFeatured }, 'Project feature status updated'));
});

// DELETE /api/admin/projects/:id
const adminDeleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  res.status(200).json(new ApiResponse(200, null, 'Project removed by moderation'));
});

// GET /api/admin/reports
const listReports = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = req.query.status ? { status: req.query.status } : {};

  const [reports, total] = await Promise.all([
    Report.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('reporter', 'name email')
      .populate('project', 'title slug'),
    Report.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { reports, meta: buildMeta(page, limit, total) }));
});

// PATCH /api/admin/reports/:id
const resolveReport = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!Object.values(REPORT_STATUS).includes(status)) throw new ApiError(400, 'Invalid status');

  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status, reviewedBy: req.user._id },
    { new: true }
  );
  if (!report) throw new ApiError(404, 'Report not found');

  res.status(200).json(new ApiResponse(200, { report }, 'Report updated'));
});

module.exports = {
  analytics, listUsers, toggleBanUser, listProjectsForModeration,
  toggleFeatureProject, adminDeleteProject, listReports, resolveReport,
};
