const express = require('express');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const validate = require('../../middlewares/validate');
const {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} = require('./category.validation');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deactivateCategory,
} = require('./category.controller');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', validate(idParamSchema, 'params'), getCategoryById);

router.post(
  '/',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
  validate(createCategorySchema, 'body'),
  createCategory,
);

router.patch(
  '/:id',
  authenticate,
  authorize('SYSTEM_ADMINISTRATOR'),
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

module.exports = router;
