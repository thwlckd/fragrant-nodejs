const mongoose = require('mongoose');
const { BrandSchema } = require('../schemas');

const Brand = mongoose.model('Brand', BrandSchema);

const brandDAO = {
  async getAllBrands() {
    const brands = await Brand.find({}).lean();

    return brands;
  },

  async getAllBrandsBySearch(search) {
    const brandIds = [
      ...(await Brand.find({
        $or: [
          {
            'name.origin': { $regex: new RegExp(search, 'i') },
          },
          {
            'name.korean': { $regex: new RegExp(search, 'i') },
          },
        ],
      })
        .select('_id')
        .lean()),
    ].map(({ _id }) => _id);

    return brandIds;
  },

  async getBrandByBrandId(brandId) {
    const brand = await Brand.findOne({ _id: brandId }).lean();

    return brand;
  },

  async getBrandByBrandName(brandName) {
    const brand = await Brand.findOne({
      $or: [{ 'name.origin': brandName }, { 'name.korean': brandName }],
    }).lean();

    return brand;
  },

  async createBrand({ origin, korean, picture }) {
    const brand = await Brand.create({
      name: {
        origin,
        korean,
      },
      picture,
    });

    return brand;
  },

  async updateBrandByBrandId(brandId, updateInfo) {
    await Brand.findByIdAndUpdate(brandId, updateInfo).lean();
  },

  async updateBrandByBrandName(brandName, updateInfo) {
    await Brand.findOneAndUpdate(
      { $or: [{ 'name.origin': brandName }, { 'name.korean': brandName }] },
      updateInfo,
    ).lean();
  },

  async deleteBrandByBrandId(brandId) {
    const { deletedCount } = await Brand.deleteOne({ _id: brandId }).lean();

    return deletedCount;
  },

  async deleteBrandByBrandName(brandName) {
    const { deletedCount } = await Brand.deleteOne({
      $or: [{ 'name.origin': brandName }, { 'name.korean': brandName }],
    }).lean();

    return deletedCount;
  },
};

module.exports = brandDAO;
