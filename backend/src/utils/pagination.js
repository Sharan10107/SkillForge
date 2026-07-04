const { PAGINATION } = require('../config/constants');

// Normalizes page/limit query params and returns both the mongoose
// skip/limit values and a ready-to-send meta object.
const getPagination = (query) => {
  const page = Math.max(Number(query.page) || PAGINATION.DEFAULT_PAGE, 1);
  const limit = Math.min(
    Number(query.limit) || PAGINATION.DEFAULT_LIMIT,
    PAGINATION.MAX_LIMIT
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const buildMeta = (page, limit, total) => ({
  page,
  limit,
  totalItems: total,
  totalPages: Math.ceil(total / limit) || 1,
  hasNextPage: page * limit < total,
  hasPrevPage: page > 1,
});

module.exports = { getPagination, buildMeta };
