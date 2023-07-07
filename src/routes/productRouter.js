const { Router } = require('express');
const productController = require('../controllers/productController');
const asyncHandler = require('../middlewares/asyncHandler');

const productRouter = Router();

productRouter.get('/', asyncHandler(productController.getAllProducts));
productRouter.get('/:productId', asyncHandler(productController.getProductByProductId));

module.exports = productRouter;
