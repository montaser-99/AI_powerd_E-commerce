import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import authorize from '../../middlewares/authorize.js';
import validate from '../../middlewares/validate.js';
import { upload } from '../../utils/upload.js';
import {
  createSubcategorySchema,
  updateSubcategorySchema,
  idParamSchema,
} from './subcategory.validation.js';
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  activateSubcategory,
  deactivateSubcategory,
  deleteSubcategory,
} from './subcategory.controller.js';

const router = express.Router();

router.get('/', getAllSubcategories);
router.get('/:id', validate(idParamSchema, 'params'), getSubcategoryById);

router.post(
  '/',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  upload.single('image'),
  validate(createSubcategorySchema, 'body'),
  createSubcategory,
);

router.patch(
  '/:id',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  upload.single('image'),
  validate(idParamSchema, 'params'),
  validate(updateSubcategorySchema, 'body'),
  updateSubcategory,
);

router.patch(
  '/:id/activate',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  validate(idParamSchema, 'params'),
  activateSubcategory,
);

router.patch(
  '/:id/deactivate',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  validate(idParamSchema, 'params'),
  deactivateSubcategory,
);

router.delete(
  '/:id',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  validate(idParamSchema, 'params'),
  deleteSubcategory,
);

export default router;
