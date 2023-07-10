const productService = require('../services/productService');

const productController = {
  // 전체 상품
  async getAllProducts(req, res) {
    const products = await productService.getAllProduct();

    res.status(200).json({ products });
  },

  async getProductByProductId(req, res) {
    const { productId } = req.params;

    const product = await productService.getProductByProductId(productId);

    res.status(200).json({ product });
  },
};

module.exports = productController;
