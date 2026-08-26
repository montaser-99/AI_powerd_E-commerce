import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import authorize from '../../middlewares/authorize.js';
import validate from '../../middlewares/validate.js';
import { upload } from '../../utils/upload.js';
import {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} from './category.validation.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deactivateCategory,
  deleteCategory,
} from './category.controller.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', validate(idParamSchema, 'params'), getCategoryById);

router.post(
  '/',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  upload.single('image'),
  validate(createCategorySchema, 'body'),
  createCategory,
);

router.patch(
  '/:id',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  upload.single('image'),
  validate(idParamSchema, 'params'),
  validate(updateCategorySchema, 'body'),
  updateCategory,
);

router.patch(
  '/:id/deactivate',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  validate(idParamSchema, 'params'),
  deactivateCategory,
);

router.delete(
  '/:id',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  validate(idParamSchema, 'params'),
  deleteCategory,
);

export default router;
