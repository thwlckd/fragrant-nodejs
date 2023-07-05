const productService = require("../services/productService");

const productController = {
  // 전체 상품
  async getAllProduct(req, res) {
    const products = await productService.getAllProduct();

    res.status(200).json({ products });
  },
};

module.exports = productController;
