function getPagination(query) {
  const page = Math.max(Number(query.page), 1);
  const limit = Math.min(Number(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function buildPaginationMeta({ page, limit, total }) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}

module.exports = { getPagination, buildPaginationMeta };
