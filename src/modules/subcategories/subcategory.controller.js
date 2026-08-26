import * as subcategoryService from './subcategory.service.js';
import { success, error } from '../../utils/response.js';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../../utils/upload.js';

export async function getAllSubcategories(req, res, next) {
  try {
    const { categoryId, activeOnly } = req.query;
    const { page, limit, skip } = getPagination(req.query);

    const { data, total } = await subcategoryService.listSubcategories({
      categoryId,
      activeOnly: activeOnly === 'true',
      limit,
      skip,
    });

    return success(res, {
      message: 'Subcategories fetched successfully',
      data,
      pagination: buildPaginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
}

export async function getSubcategoryById(req, res, next) {
  try {
    const subcategory = await subcategoryService.getSubcategory(req.params.id);
    return success(res, {
      message: 'Subcategory fetched successfully',
      data: subcategory,
    });
  } catch (err) {
    next(err);
  }
}

export async function createSubcategory(req, res, next) {
  try {
    let image = null;
    let image_public_id = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'subcategories');
      image = result.secure_url;
      image_public_id = result.public_id;
    }

    const subcategory = await subcategoryService.createSubcategory({
      ...req.body,
      image,
      image_public_id,
    });

    return success(res, {
      statusCode: 201,
      message: 'Subcategory created successfully',
      data: subcategory,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateSubcategory(req, res, next) {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'subcategories');
      updates.image = result.secure_url;
      updates.image_public_id = result.public_id;
    }

    const { updated, oldPublicId } = await subcategoryService.updateSubcategory(
      req.params.id,
      updates,
    );

    if (oldPublicId) {
      deleteFromCloudinary(oldPublicId).catch((e) =>
        console.error('Cloudinary cleanup failed:', e.message),
      );
    }

    return success(res, {
      message: 'Subcategory updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

export async function activateSubcategory(req, res, next) {
  try {
    const subcategory = await subcategoryService.activateSubcategory(
      req.params.id,
    );
    return success(res, {
      message: 'Subcategory activated successfully',
      data: subcategory,
    });
  } catch (err) {
    next(err);
  }
}

export async function deactivateSubcategory(req, res, next) {
  try {
    const subcategory = await subcategoryService.deactivateSubcategory(
      req.params.id,
    );
    return success(res, {
      message: 'Subcategory deactivated successfully',
      data: subcategory,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSubcategory(req, res, next) {
  try {
    const deleted = await subcategoryService.deleteSubcategory(req.params.id);

    if (deleted.image_public_id) {
      deleteFromCloudinary(deleted.image_public_id).catch((e) =>
        console.error('Cloudinary cleanup failed:', e.message),
      );
    }

    return success(res, {
      message: 'Subcategory deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
}
