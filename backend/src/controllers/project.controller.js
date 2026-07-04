const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const Project = require('../models/Project.model');
const Bookmark = require('../models/Bookmark.model');
const { getPagination, buildMeta } = require('../utils/pagination');
const { notify } = require('../services/notification.service');
const { PROJECT_STATUS } = require('../config/constants');

// POST /api/projects
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.user._id });
  res.status(201).json(new ApiResponse(201, { project }, 'Project created'));
});

// GET /api/projects  (explore feed: search, filter, sort, paginate)
const getProjects = asyncHandler(async (req, res) => {
  const { q, category, tags, sort = 'newest', owner } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const filter = { status: PROJECT_STATUS.PUBLISHED };
  if (category) filter.category = category;
  if (owner) filter.owner = owner;
  if (tags) filter.tags = { $in: tags.split(',').map((t) => t.trim().toLowerCase()) };
  if (q) filter.$text = { $search: q };

  const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    trending: { likesCount: -1, viewsCount: -1 },
    mostCommented: { commentsCount: -1 },
  };

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .sort(sortMap[sort] || sortMap.newest)
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name avatarUrl slug headline'),
    Project.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { projects, meta: buildMeta(page, limit, total) }));
});

// GET /api/projects/featured
const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ isFeatured: true, status: PROJECT_STATUS.PUBLISHED })
    .sort({ createdAt: -1 })
    .limit(6)
    .populate('owner', 'name avatarUrl slug');
  res.status(200).json(new ApiResponse(200, { projects }));
});

// GET /api/projects/:slug
const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { viewsCount: 1 } },
    { new: true }
  ).populate('owner', 'name avatarUrl slug headline');

  if (!project) throw new ApiError(404, 'Project not found');
  res.status(200).json(new ApiResponse(200, { project }));
});

const assertOwnerOrAdmin = (project, user) => {
  const isOwner = String(project.owner._id || project.owner) === String(user._id);
  if (!isOwner && user.role !== 'admin') {
    throw new ApiError(403, 'You do not have permission to modify this project');
  }
};

// PATCH /api/projects/:id
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  assertOwnerOrAdmin(project, req.user);

  const editable = [
    'title', 'tagline', 'description', 'category', 'tags', 'coverImage', 'gallery',
    'githubUrl', 'liveUrl', 'videoUrl', 'techStack', 'status',
  ];
  editable.forEach((field) => {
    if (req.body[field] !== undefined) project[field] = req.body[field];
  });

  await project.save();
  res.status(200).json(new ApiResponse(200, { project }, 'Project updated'));
});

// DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  assertOwnerOrAdmin(project, req.user);

  await project.deleteOne();
  res.status(200).json(new ApiResponse(200, null, 'Project deleted'));
});

// POST /api/projects/:id/like
const toggleLike = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  const alreadyLiked = project.likes.some((id) => String(id) === String(req.user._id));

  if (alreadyLiked) {
    project.likes.pull(req.user._id);
  } else {
    project.likes.push(req.user._id);
    await notify({
      recipient: project.owner,
      sender: req.user._id,
      type: 'like',
      project: project._id,
      message: `${req.user.name} liked your project "${project.title}"`,
    });
  }

  project.likesCount = project.likes.length;
  await project.save();

  res.status(200).json(new ApiResponse(200, { liked: !alreadyLiked, likesCount: project.likesCount }));
});

// GET /api/projects/me/mine
const getMyProjects = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { owner: req.user._id };

  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { projects, meta: buildMeta(page, limit, total) }));
});

module.exports = {
  createProject, getProjects, getFeaturedProjects, getProjectBySlug,
  updateProject, deleteProject, toggleLike, getMyProjects,
};
