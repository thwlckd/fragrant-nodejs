const { productDAO, brandDAO, categoryDAO } = require("../models/model");

const productService = {
  // 전체 상품 조회
  async getAllProduct() {
    const products = await productDAO.findAllProducts();

    return products;
  },

  //특정 브랜드의 상품 조회
  async getAllProductByBrand(brand) {
    const { id } = await brandDAO.getIdByName(brand);

    const products = await productDAO.findAllProductsByBrand(id);

    return products;
  },

  //특정 카테고리의 상품 조희
  async getAllProductByCategory(category) {
    const { id } = await categoryDAO.getIdByName(category);

    const products = await productDAO.findAllProductsByBrand(id);

    return products;
  },

  //특정 성별 상품 조회
  async getAllProductByGender(gender) {
    const products = await productDAO.findAllProductsByGender(gender);

    return products;
  },

  //상품 상세조회
  async getProductByProductId(id) {
    const product = await productDAO.findProductByProductId(id);

    return product;
  },

  //관리자
  //상품 추가
  async addProduct(productInfo) {
    await productDAO.createProduct(productInfo);
  },

  //상품 수정
  async updateProduct(id, updateInfo) {
    await productDAO.updateProductByProductId(id, updateInfo);
  },

  //상품 삭제
  //단일
  async deleteProductByProductId(id) {
    await productDAO.deleteProductByProductId(id);
  },

  //다수
  async deleteProductsByProductIds(ids) {
    const promises = ids.map(async (id) => {
      await productDAO.deleteProductByProductId(id);
    });

    await Promise.all(promises);
  },
};

module.exports = productService;
