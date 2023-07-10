const { ObjectId } = require('mongoose').Types;
const { productDAO, brandDAO, noteDAO } = require('../models/model');

const productService = {
  // 전체 상품 조회
  async getAllProducts({ page, perPage }) {
    const { products, total } = await productDAO.getAllProducts({ page, perPage });

    const totalPage = Math.ceil(total / perPage);

    return { products, totalPage };
  },

  // 검색
  async getAllProductsBySearch(search, { page, perPage }) {
    const [brandIds, noteIds] = await Promise.all([
      brandDAO.getAllBrandsBySearch(search),
      noteDAO.getAllNotesBySearch(search),
    ]);

    const { products, total } = await productDAO.getAllProductsBySearch(search, brandIds, noteIds, {
      page,
      perPage,
    });

    const totalPage = Math.ceil(total / perPage);

    return { products, totalPage };
  },

  // 브랜드
  async getAllProductsByBrand(target, { page, perPage }) {
    const key = '_id';
    const brandId = ObjectId.isValid(target)
      ? target
      : (await brandDAO.getBrandByBrandName(target))[key];

    const { products, total } = await productDAO.getAllProductsByBrandId(brandId, {
      page,
      perPage,
    });

    const totalPage = Math.ceil(total / perPage);

    return { products, totalPage };
  },

  // 노트
  async getAllProductsByNote(target, { page, perPage }) {
    const key = '_id';
    const noteId = ObjectId.isValid(target)
      ? target
      : (await noteDAO.getNoteByNoteType(target))[key];

    const { products, total } = await productDAO.getAllProductsByNoteId(noteId, {
      page,
      perPage,
    });

    const totalPage = Math.ceil(total / perPage);

    return { products, totalPage };
  },

  // 특정 성별 상품 조회
  async getAllProductsByGender(gender, { page, perPage }) {
    const { products, total } = await productDAO.getAllProductsByGender(gender, { page, perPage });

    const totalPage = Math.ceil(total / perPage);

    return { products, totalPage };
  },

  // 상품 상세조회

  async getProduct(target) {
    const product = ObjectId.isValid(target)
      ? await productDAO.findProductByProductId(target)
      : await productDAO.findProductByProductName(target);

    return product;
  },

  // 관리자
  // 상품 추가
  async createProduct(productInfo) {
    const product = await productDAO.createProduct(productInfo);

    return product;
  },

  // 상품 수정
  async updateProduct(id, updateInfo) {
    await productDAO.updateProductByProductId(id, updateInfo);
  },

  // 상품 삭제
  // 단일
  async deleteProductByProductId(id) {
    await productDAO.deleteProductByProductId(id);
  },

  // 다수
  async deleteProductsByProductIds(ids) {
    const promises = ids.map(async (id) => {
      await productDAO.deleteProductByProductId(id);
    });

    await Promise.all(promises);
  },
};

module.exports = productService;
