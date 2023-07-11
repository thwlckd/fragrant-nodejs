const mongoose = require('mongoose');
const { ProductSchema, ProductIdCounterSchema } = require('../schemas');

const Product = mongoose.model('Product', ProductSchema);
const ProductId = mongoose.model('ProductId', ProductIdCounterSchema);

function autoIncId(next) {
  const doc = this;
  if (!doc.isNew) {
    next();
    return;
  }
  ProductId.findOneAndUpdate(
    { target: 'product' },
    { $inc: { usableId: 1 } },
    { new: true, update: true },
  )
    .then((counter) => {
      doc.productId = counter.usableId;
      next();
    })
    .catch((err) => {
      throw err;
    });
}

ProductSchema.pre('save', autoIncId);

const productDAO = {
  // 모든 리스트
  async getAllProducts({ page, perPage }) {
    const [products, total] = await Promise.all([
      Product.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean(),
      Product.countDocuments({}),
    ]);

    return { products, total };
  },

  // 서치
  async getAllProductsBySearch(search, brandIds, noteIds, { page, perPage }) {
    const [products, total] = await Promise.all([
      Product.find({
        $or: [
          {
            'name.origin': { $regex: new RegExp(search, 'i') },
          },
          {
            'name.korean': { $regex: new RegExp(search, 'i') },
          },
          {
            gender: { $regex: new RegExp(search, 'i') },
          },
          {
            note: { $elemMatch: { $in: noteIds } },
          },
          {
            brand: { $in: brandIds },
          },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean(),
      Product.countDocuments({
        $or: [
          {
            'name.origin': { $regex: new RegExp(search, 'i') },
          },
          {
            'name.korean': { $regex: new RegExp(search, 'i') },
          },
          {
            gender: { $regex: new RegExp(search, 'i') },
          },
          {
            note: { $elemMatch: { $in: noteIds } },
          },
          {
            brand: { $in: brandIds },
          },
        ],
      }),
    ]);

    return { products, total };
  },

  // 특정 브랜드 리스트
  async getAllProductsByBrandId(brandId, { page, perPage }) {
    const [products, total] = await Promise.all([
      Product.find({ brand: brandId })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean(),
      Product.countDocuments({ brand: brandId }),
    ]);

    return { products, total };
  },

  // 특정 노트 리스트
  async getAllProductsByNoteId(noteId, { page, perPage }) {
    const [products, total] = await Promise.all([
      Product.find({ note: { $all: [noteId] } })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean(),
      Product.countDocuments({ note: { $all: [noteId] } }),
    ]);

    return { products, total };
  },

  // 성별 리스트
  async getAllProductsByGender(gender, { page, perPage }) {
    const [products, total] = await Promise.all([
      Product.find({ gender })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean(),
      Product.countDocuments({ gender }),
    ]);

    return { products, total };
  },

  // id로 찾기(상세조회)
  async findProductByProductId(productId) {
    const product = await Product.findOne({ productId }).lean();

    return product;
  },

  async findProductByProductName(productName) {
    const product = await Product.findOne({
      $or: [{ 'name.origin': productName }, { 'name.korean': productName }],
    }).lean();

    return product;
  },

  // 관리자
  // 상품 추가
  async createProduct(productInfo) {
    const product = await Product.create(productInfo);

    return product;
  },

  // 상품 수정
  async updateProductByProductId(productId, updateInfo) {
    await Product.findOne({ productId }).update(updateInfo);
  },

  // 상품 삭제 (삭제시, 리뷰 다큐멘트도 삭제)
  async deleteProductByProductId(productId) {
    const { deleteCount } = await Product.deleteOne({ productId });

    return deleteCount;
  },
};

module.exports = productDAO;
