const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const validate = require('../../middlewares/validate');
const { upload } = require('../../utils/upload');
const {
  createSubcategorySchema,
  updateSubcategorySchema,
  idParamSchema,
} = require('./subcategory.validation');
const {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  activateSubcategory,
  deactivateSubcategory,
} = require('./subcategory.controller');

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

module.exports = router;
