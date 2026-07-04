const router = require('express').Router();
const {
  createProject, getProjects, getFeaturedProjects, getProjectBySlug,
  updateProject, deleteProject, toggleLike, getMyProjects,
} = require('../controllers/project.controller');
const { getComments, addComment } = require('../controllers/comment.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { projectRules } = require('../validators/project.validator');

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/me/mine', protect, getMyProjects);
router.post('/', protect, projectRules, validate, createProject);

router.get('/:slug', getProjectBySlug);
router.patch('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/like', protect, toggleLike);

// Nested comments
router.get('/:projectId/comments', getComments);
router.post('/:projectId/comments', protect, addComment);

module.exports = router;
