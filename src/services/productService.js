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
    let brandId = target;
    if (!ObjectId.isValid(target)) {
      const key = '_id';
      const brand = await brandDAO.getBrandByBrandName(target);
      brandId = brand ? brand[key] : undefined;
    }

    if (!brandId) return { products: [], totalPage: 0 };

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
    const product = !Number.isNaN(parseInt(target, 10))
      ? await productDAO.getProductByProductId(target)
      : await productDAO.getProductByProductName(target);

    return product;
  },

  // 관리자
  // 상품 추가
  async createProduct({
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
  }) {
    const productInfo = {
      name: { origin, korean },
      capacity,
      price,
      note: note.split(','),
      brand,
      description,
      picture,
    };

    if (gender) productInfo.gender = gender;
    if (quantity) productInfo.quantity = quantity;

    const product = await productDAO.createProduct(productInfo);

    return product;
  },

  // 상품 수정
  async updateProduct(
    target,
    { origin, korean, capacity, price, gender, note, brand, description, quantity, picture },
  ) {
    const isNumberTarget = !Number.isNaN(parseInt(target, 10));
    const updateInfo = isNumberTarget
      ? await productDAO.getProductByProductId(target)
      : await productDAO.getProductByProductName(target);

    if (origin) updateInfo.name.origin = origin;
    if (korean) updateInfo.name.korean = korean;
    if (note) updateInfo.note = note.split(',');
    if (capacity) updateInfo.capacity = capacity;
    if (price) updateInfo.price = price;
    if (gender) updateInfo.gender = gender;
    if (brand) updateInfo.brand = brand;
    if (description) updateInfo.description = description;
    if (quantity) updateInfo.quantity = quantity;
    if (picture) updateInfo.picture = picture;

    if (isNumberTarget) await productDAO.updateProductByProductId(target, updateInfo);
    else await productDAO.updateProductByProductName(target, updateInfo);
  },

  // 상품 삭제
  // 단일
  async deleteProductByProductId(id) {
    await productDAO.deleteProductByProductId(id);
  },

  async deleteProduct(target) {
    // 해당 브랜드에 상품이 존재할경우 삭제안되게 해야함
    // 관련된 상품 모두삭제?
    const deletedCount = !Number.isNaN(parseInt(target, 10))
      ? await productDAO.deleteProductByProductId(target)
      : await productDAO.deleteProductByProductName(target);

    return deletedCount;
  },
};

module.exports = productService;
