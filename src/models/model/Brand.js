const mongoose = require('mongoose');
const { BrandSchema } = require('../schemas');

const Brand = mongoose.model('Brand', BrandSchema);

const brandDAO = {
  async getAllBrands() {
    const brands = await Brand.find({});

    return brands;
  },

  async getBrandByBrandId(brandId) {
    const brand = await Brand.findOne({ _id: brandId });

    return brand;
  },

  async getBrand(target) {
    const brand = await Brand.findOne({
      $or: [{ 'brand.origin': target }, { 'brand.korean': target }],
    });

    return brand;
  },

  async createBrand({ origin, korean, picture }) {
    const brand = await Brand.create({
      brand: {
        origin,
        korean,
      },
      picture,
    });

    return brand;
  },

  async updateBrandByBrandId(id, updateInfo) {
    await Brand.findByIdAndUpdate(id, updateInfo);
  },

  async deleteBrandByBrandId(brandId) {
    await Brand.deleteOne({ _id: brandId });
  },
};

module.exports = brandDAO;
