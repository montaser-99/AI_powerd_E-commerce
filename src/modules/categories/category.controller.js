import * as categoryService from './category.service.js';
import { success, error } from '../../utils/response.js';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../../utils/upload.js';

export async function getAllCategories(req, res, next) {
  try {
    const { activeOnly } = req.query;
    const { page, limit, skip } = getPagination(req.query);

    const { data, total } = await categoryService.listCategories({
      activeOnly: activeOnly === 'true',
      limit,
      skip,
    });

    return success(res, {
      message: 'Categories fetched successfully',
      data,
      pagination: buildPaginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await categoryService.getCategory(req.params.id);
    return success(res, {
      message: 'Category fetched successfully',
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req, res, next) {
  try {
    let image = null;
    let image_public_id = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'categories');
      image = result.secure_url;
      image_public_id = result.public_id;
    }

    const category = await categoryService.createCategory({
      ...req.body,
      image,
      image_public_id,
    });
    return success(res, {
      statusCode: 201,
      message: 'Category created successfully',
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'categories');
      updates.image = result.secure_url;
      updates.image_public_id = result.public_id;
    }

    const { updated, oldPublicId } = await categoryService.updateCategory(
      req.params.id,
      updates,
    );

    if (oldPublicId) {
      deleteFromCloudinary(oldPublicId).catch((e) =>
        console.error('Cloudinary cleanup failed:', e.message),
      );
    }

    return success(res, {
      message: 'Category updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

export async function deactivateCategory(req, res, next) {
  try {
    const category = await categoryService.deactivateCategory(req.params.id);
    return success(res, {
      message: 'Category deactivated successfully',
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);

    if (deleted.image_public_id) {
      deleteFromCloudinary(deleted.image_public_id).catch((e) =>
        console.error('Cloudinary cleanup failed:', e.message),
      );
    }

    return success(res, {
      message: 'Category deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
}
