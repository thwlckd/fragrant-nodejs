const { Router } = require('express');
const { brandController } = require('../controllers');
const asyncHandler = require('../middlewares/asyncHandler');
const upload = require('../utils/imgUploader');

const brandRouter = Router();

brandRouter.get('/', asyncHandler(brandController.getAllBrands));
brandRouter.post('/', upload.single('picture'), asyncHandler(brandController.createBrand));
brandRouter.patch('/', upload.single('picture'), asyncHandler(brandController.updateBrand));
brandRouter.delete('/:target', asyncHandler(brandController.deleteBrand));

brandRouter.get('/:target', asyncHandler(brandController.getBrand));

module.exports = brandRouter;
