const { productService } = require('../services');

const productController = {
  // 전체 상품
  async getAllProducts(req, res) {
    const { page, perPage } = req.query;

    const { products, totalPage } = await productService.getAllProducts({
      page: page || 1,
      perPage: perPage || 16,
    });

    res.json({ products, totalPage });
  },

  async getAllProductsBySearch(req, res) {
    const { search } = req.params;
    const { page, perPage } = req.query;

    const { products, totalPage } = await productService.getAllProductsBySearch(search, {
      page: page || 1,
      perPage: perPage || 16,
    });

    res.json({ products, totalPage });
  },

  async getAllProductsByBrand(req, res) {
    const { target } = req.params;
    const { page, perPage } = req.query;

    const { products, totalPage } = await productService.getAllProductsByBrand(target, {
      page: page || 1,
      perPage: perPage || 16,
    });

    res.json({ products, totalPage });
  },

  async getAllProductsByNote(req, res) {
    const { target } = req.params;
    const { page, perPage } = req.query;

    const { products, totalPage } = await productService.getAllProductsByNote(target, {
      page: page || 1,
      perPage: perPage || 16,
    });

    res.json({ products, totalPage });
  },

  async getAllProductsByGender(req, res) {
    const { gender } = req.params;
    const { page, perPage } = req.query;

    const { products, totalPage } = await productService.getAllProductsByGender(gender, {
      page: page || 1,
      perPage: perPage || 16,
    });

    res.json({ products, totalPage });
  },

  async getProduct(req, res) {
    const { target } = req.params;

    const product = await productService.getProduct(target);

    res.json({ product });
  },

  // 상품 생성
  async createProduct(req, res) {
    const product = productService.createProduct({});

    res.json({ product });
  },
};

module.exports = productController;
