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
      : await brandDAO.getBrandByBrandName(target);

    return brand;
  },

  async createBrand({ origin, korean, picture }) {
    await brandDAO.createBrand({ origin, korean, picture });
  },

  async updateBrand(target, { origin, korean, picture }) {
    const isObjectId = ObjectId.isValid(target);
    const updateInfo = isObjectId
      ? await brandDAO.getBrandByBrandId(target)
      : await brandDAO.getBrandByBrandName(target);

    if (origin) updateInfo.name.origin = origin;
    if (korean) updateInfo.name.korean = korean;
    if (picture) updateInfo.picture = picture;

    if (isObjectId) await brandDAO.updateBrandByBrandId(target, updateInfo);
    else await brandDAO.updateBrandByBrandName(target, updateInfo);
  },

  async deleteBrand(target) {
    // 해당 브랜드에 상품이 존재할경우 삭제안되게 해야함
    // 관련된 상품 모두삭제?
    const deletedCount = ObjectId.isValid(target)
      ? await brandDAO.deleteBrandByBrandId(target)
      : await brandDAO.deleteBrandByBrandName(target);

    return deletedCount;
  },
};

module.exports = brandService;
