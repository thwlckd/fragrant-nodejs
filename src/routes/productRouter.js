const { Router } = require('express');
const productController = require('../controllers/productController');
const asyncHandler = require('../middlewares/asyncHandler');

const productRouter = Router();

productRouter.get('/', asyncHandler(productController.getAllProducts));
productRouter.get('/search/:search', asyncHandler(productController.getAllProductsBySearch));
productRouter.get('/brands/:target', asyncHandler(productController.getAllProductsByBrand));
productRouter.get('/notes/:target', asyncHandler(productController.getAllProductsByNote));
productRouter.get('/genders/:gender', asyncHandler(productController.getAllProductsByGender));

productRouter.get('/:target', asyncHandler(productController.getProduct));

productRouter.post('/', asyncHandler(productController.createProduct));

module.exports = productRouter;
