const { ObjectId } = require('mongoose').Types;
const { brandDAO } = require('../models/model');

const brandService = {
  async getAllBrands() {
    const brands = await brandDAO.getAllBrands();

    return brands;
  },

  async getBrand(target) {
    const brand = ObjectId.isValid(target)
      ? await brandDAO.getBrandByBrandId(target)
      : await brandDAO.getBrand(target);

    return brand;
  },

  async createBrand({ origin, korean, picture }) {
    await brandDAO.createBrand({ origin, korean, picture });
  },

  async updateBrandByBrandId(brandId, { origin, korean, file }) {
    const updateInfo = await brandDAO.getBrandByBrandId(brandId);

    if (origin) updateInfo.brand.origin = origin;
    if (korean) updateInfo.brand.korean = korean;
    if (file && file.path) updateInfo.picture = file.path;

    await brandDAO.updateBrandByBrandId(brandId, updateInfo);
  },

  async deleteBrandByBrandId(brandId) {
    // 해당 브랜드에 상품이 존재할경우 삭제안되게 해야함
    await brandDAO.deleteBrandByBrandId(brandId);
  },
};

module.exports = brandService;
