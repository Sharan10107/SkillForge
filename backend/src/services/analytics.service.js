const User = require('../models/User.model');
const Project = require('../models/Project.model');
const Comment = require('../models/Comment.model');

// Aggregation pipelines backing the admin analytics dashboard.
const getOverview = async () => {
  const [userCount, projectCount, commentCount, topCategories] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Comment.countDocuments(),
    Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
  ]);

  const signupsByMonth = await User.aggregate([
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 },
  ]);

  return { userCount, projectCount, commentCount, topCategories, signupsByMonth };
};

module.exports = { getOverview };
