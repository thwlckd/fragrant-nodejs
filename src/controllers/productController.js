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
    const {
      originName: origin,
      koreanName: korean,
      capacity,
      price,
      gender,
      note,
      brand,
      description,
      quantity,
    } = req.body;
    const { path } = req.file;
    const picture = path.split('public')[1];

    if (!origin || !korean || !capacity || !price || !note || !brand || !description || !picture) {
      res.status(400).end();
      return;
    }

    const product = productService.createProduct({
      origin,
      korean,
      capacity,
      price,
      gender,
      note,
      brand,
      description,
      quantity,
      picture,
    });

    res.status(201).json({ product });
  },

  async updateProduct(req, res) {
    const {
      target,
      originName: origin,
      koreanName: korean,
      capacity,
      price,
      gender,
      note,
      brand,
      description,
      quantity,
    } = req.body;
    const { file } = req;
    const path = file && file.path;
    const picture = path && path.split('public')[1];

    const product = productService.updateProduct(target, {
      origin,
      korean,
      capacity,
      price,
      gender,
      note,
      brand,
      description,
      quantity,
      picture,
    });

    res.status(201).json({ product });
  },

  async deleteProduct(req, res) {
    const { target } = req.params;

    const deletedCount = await productService.deleteProduct(target);
    res.json({ deletedCount });
  },
};

module.exports = productController;
