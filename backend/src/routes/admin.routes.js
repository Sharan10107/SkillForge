const router = require('express').Router();
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { ROLES } = require('../config/constants');
const {
  analytics, listUsers, toggleBanUser, listProjectsForModeration,
  toggleFeatureProject, adminDeleteProject, listReports, resolveReport,
} = require('../controllers/admin.controller');

router.use(protect, authorize(ROLES.ADMIN));

router.get('/analytics', analytics);
router.get('/users', listUsers);
router.patch('/users/:id/ban', toggleBanUser);
router.get('/projects', listProjectsForModeration);
router.patch('/projects/:id/feature', toggleFeatureProject);
router.delete('/projects/:id', adminDeleteProject);
router.get('/reports', listReports);
router.patch('/reports/:id', resolveReport);

module.exports = router;
