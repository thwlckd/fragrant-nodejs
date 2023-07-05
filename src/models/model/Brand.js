const mongoose = require("mongoose");
const { BrandSchema } = require("../schema");

const Brand = mongoose.model("Brand", BrandSchema);

const brandDAO = {
  async getIdByName(brandName) {
    const { id } = await Brand.findOne({
      $or: [
        {
          brand: { origin: brandName },
        },
        {
          brand: { korean: brandName },
        },
      ],
    });

    return id;
  },
};

module.exports = brandDAO;
