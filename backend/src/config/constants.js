// Shared enums and limits used across models, controllers, and validators.
module.exports = {
  ROLES: { STUDENT: 'student', ADMIN: 'admin' },
  PROJECT_STATUS: { DRAFT: 'draft', PUBLISHED: 'published', ARCHIVED: 'archived' },
  PROJECT_CATEGORIES: [
    'Web Development', 'Mobile App', 'Machine Learning', 'Data Science',
    'DevOps', 'Game Development', 'UI/UX Design', 'Blockchain', 'IoT', 'Other',
  ],
  REPORT_STATUS: { PENDING: 'pending', REVIEWED: 'reviewed', DISMISSED: 'dismissed' },
  NOTIFICATION_TYPES: { LIKE: 'like', COMMENT: 'comment', BOOKMARK: 'bookmark', FOLLOW: 'follow', SYSTEM: 'system' },
  PAGINATION: { DEFAULT_PAGE: 1, DEFAULT_LIMIT: 12, MAX_LIMIT: 50 },
};
