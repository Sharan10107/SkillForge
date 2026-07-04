const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const Comment = require('../models/Comment.model');
const Project = require('../models/Project.model');
const { notify } = require('../services/notification.service');
const { getPagination, buildMeta } = require('../utils/pagination');

// GET /api/projects/:projectId/comments
const getComments = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { project: req.params.projectId, parentComment: null };

  const [comments, total] = await Promise.all([
    Comment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatarUrl slug'),
    Comment.countDocuments(filter),
  ]);

  res.status(200).json(new ApiResponse(200, { comments, meta: buildMeta(page, limit, total) }));
});

// POST /api/projects/:projectId/comments
const addComment = asyncHandler(async (req, res) => {
  const { content, parentComment } = req.body;
  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, 'Project not found');

  const comment = await Comment.create({
    project: project._id,
    author: req.user._id,
    content,
    parentComment: parentComment || null,
  });

  project.commentsCount += 1;
  await project.save();

  await notify({
    recipient: project.owner,
    sender: req.user._id,
    type: 'comment',
    project: project._id,
    message: `${req.user.name} commented on your project "${project.title}"`,
  });

  const populated = await comment.populate('author', 'name avatarUrl slug');
  res.status(201).json(new ApiResponse(201, { comment: populated }, 'Comment added'));
});

// PATCH /api/comments/:id
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new ApiError(404, 'Comment not found');
  if (String(comment.author) !== String(req.user._id)) {
    throw new ApiError(403, 'You can only edit your own comments');
  }

  comment.content = req.body.content;
  comment.isEdited = true;
  await comment.save();

  res.status(200).json(new ApiResponse(200, { comment }, 'Comment updated'));
});

// DELETE /api/comments/:id
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new ApiError(404, 'Comment not found');

  const isAuthor = String(comment.author) === String(req.user._id);
  if (!isAuthor && req.user.role !== 'admin') {
    throw new ApiError(403, 'You do not have permission to delete this comment');
  }

  await comment.deleteOne();
  await Project.findByIdAndUpdate(comment.project, { $inc: { commentsCount: -1 } });

  res.status(200).json(new ApiResponse(200, null, 'Comment deleted'));
});

module.exports = { getComments, addComment, updateComment, deleteComment };
