const mongoose = require("mongoose");
const { ProductSchema } = require("../schema");

const Product = mongoose.model("Product", ProductSchema);

const productDAO = {
  //모든 리스트
  async findAllProducts() {
    const products = await Product.find({});

    return products;
  },

  //특정 브랜드 리스트
  async findAllProductsByBrand(brandId) {
    const products = await Product.find({ brand: brandId });

    return products;
  },

  // 특정 상품 구분 리스트
  async findAllProductsByCategory(categoryId) {
    const products = await Product.find({ catogory: categoryId });

    return products;
  },

  //성별 리스트
  async findAllProductsByGender(gender) {
    const products = await Product.find({ gender });

    return products;
  },

  //id로 찾기(상세조회)
  async findProductByProductId(productId) {
    const product = await Product.findOne({ productId });

    return product;
  },

  //관리자
  //상품 추가
  async createProduct(productInfo) {
    await Product.create(productInfo);
  },

  //상품 수정
  async updateProductByProductId(productId, updateInfo) {
    await Product.findOne({ productId }).update(updateInfo);
  },

  //상품 삭제 (삭제시, 리뷰 다큐멘트도 삭제)
  async deleteProductByProductId(productId) {
    const { deleteCount } = await Product.deleteOne({ productId });

    return deleteCount;
  },
};

module.exports = productDAO;
