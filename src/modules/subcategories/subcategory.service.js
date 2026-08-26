import Subcategory from './subcategory.model.js';
import Category from '../categories/category.model.js';
import Product from '../products/product.model.js';

async function assertCategoryExists(categoryId) {
  const category = await Category.findById(categoryId);
  if (!category) {
    const err = new Error('Parent category not found');
    err.statusCode = 404;
    throw err;
  }
  return category;
}

export async function listSubcategories({
  categoryId,
  activeOnly,
  limit,
  skip,
}) {
  const filter = {};
  if (categoryId) filter.category_id = categoryId;
  if (activeOnly) filter.is_active = true;

  const [data, total] = await Promise.all([
    Subcategory.find(filter)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .populate('category_id', 'name_en name_ar'),
    Subcategory.countDocuments(filter),
  ]);

  return { data, total };
}

export async function getSubcategory(id) {
  const subcategory = await Subcategory.findById(id).populate(
    'category_id',
    'name_en name_ar',
  );
  if (!subcategory) {
    const err = new Error('Subcategory not found');
    err.statusCode = 404;
    throw err;
  }
  return subcategory;
}

export async function createSubcategory({
  category_id,
  name_en,
  name_ar,
  image,
  image_public_id,
  is_active,
}) {
  await assertCategoryExists(category_id);

  const existing = await Subcategory.findOne({
    category_id,
    $or: [{ name_en }, { name_ar }],
  });
  if (existing) {
    const err = new Error(
      'A subcategory with this name already exists under this category',
    );
    err.statusCode = 409;
    throw err;
  }

  return Subcategory.create({
    category_id,
    name_en,
    name_ar,
    image,
    image_public_id,
    is_active,
  });
}

export async function updateSubcategory(id, updates) {
  const current = await getSubcategory(id);

  if (updates.category_id) {
    await assertCategoryExists(updates.category_id);
  }

  const targetCategoryId = updates.category_id || current.category_id;

  if (updates.name_en || updates.name_ar) {
    const duplicate = await Subcategory.findOne({
      _id: { $ne: id },
      category_id: targetCategoryId,
      $or: [
        updates.name_en ? { name_en: updates.name_en } : null,
        updates.name_ar ? { name_ar: updates.name_ar } : null,
      ].filter(Boolean),
    });
    if (duplicate) {
      const err = new Error(
        'Another subcategory already uses this name under this category',
      );
      err.statusCode = 409;
      throw err;
    }
  }

  const oldPublicId = current.image_public_id;
  const updated = await Subcategory.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  return { updated, oldPublicId: updates.image_public_id ? oldPublicId : null };
}

export async function setActiveStatus(id, isActive) {
  await getSubcategory(id);
  return Subcategory.findByIdAndUpdate(
    id,
    { is_active: isActive },
    { new: true },
  );
}

export const activateSubcategory = (id) => setActiveStatus(id, true);
export const deactivateSubcategory = (id) => setActiveStatus(id, false);

export async function deleteSubcategory(id) {
  await getSubcategory(id);

  const productsCount = await Product.countDocuments({ subcategory_id: id });
  if (productsCount > 0) {
    const err = new Error(
      `Cannot delete subcategory: ${productsCount} product(s) still reference it. Delete or reassign them first.`,
    );
    err.statusCode = 409;
    throw err;
  }

  const deleted = await Subcategory.findByIdAndDelete(id);
  return deleted;
}
