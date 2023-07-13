const { Router } = require('express');
const { productController } = require('../controllers');
const asyncHandler = require('../middlewares/asyncHandler');
const upload = require('../utils/imgUploader');
const { adminOnly } = require('../middlewares');

const productRouter = Router();

productRouter.get('/', asyncHandler(productController.getAllProducts));
productRouter.get('/search/:search', asyncHandler(productController.getAllProductsBySearch));
productRouter.get('/brands/:target', asyncHandler(productController.getAllProductsByBrand));
productRouter.get('/notes/:target', asyncHandler(productController.getAllProductsByNote));
productRouter.get('/genders/:gender', asyncHandler(productController.getAllProductsByGender));

productRouter.get('/:target', asyncHandler(productController.getProduct));

productRouter.post(
  '/',
  adminOnly,
  upload.single('picture'),
  asyncHandler(productController.createProduct),
);
productRouter.patch(
  '/',
  adminOnly,
  upload.single('picture'),
  asyncHandler(productController.updateProduct),
);
productRouter.delete('/:target', adminOnly, asyncHandler(productController.deleteProduct));

module.exports = productRouter;
