const Category = require('./category.model');

async function listCategories({ activeOnly, limit, skip }) {
  const filter = activeOnly ? { is_active: true } : {};

  const [data, total] = await Promise.all([
    Category.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit),
    Category.countDocuments(filter),
  ]);

  return { data, total };
}

async function getCategory(id) {
  const category = await Category.findById(id);
  if (!category) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return category;
}

async function createCategory({
  name_en,
  name_ar,
  image,
  image_public_id,
  is_active,
}) {
  const existing = await Category.findOne({ $or: [{ name_en }, { name_ar }] });
  if (existing) {
    const err = new Error(
      'A category with this name already exists (EN or AR)',
    );
    err.statusCode = 409;
    throw err;
  }
  return Category.create({
    name_en,
    name_ar,
    image,
    image_public_id,
    is_active,
  });
}

async function updateCategory(id, updates) {
  const current = await getCategory(id);

  if (updates.name_en || updates.name_ar) {
    const duplicate = await Category.findOne({
      _id: { $ne: id },
      $or: [
        updates.name_en ? { name_en: updates.name_en } : null,
        updates.name_ar ? { name_ar: updates.name_ar } : null,
      ].filter(Boolean),
    });
    if (duplicate) {
      const err = new Error(
        'Another category already uses this name (EN or AR)',
      );
      err.statusCode = 409;
      throw err;
    }
  }

  const oldPublicId = current.image_public_id;
  const updated = await Category.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  return { updated, oldPublicId: updates.image_public_id ? oldPublicId : null };
}

async function deactivateCategory(id) {
  await getCategory(id);
  return Category.findByIdAndUpdate(id, { is_active: false }, { new: true });
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deactivateCategory,
};
