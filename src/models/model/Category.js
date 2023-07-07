const mongoose = require("mongoose");
const { CategorySchema } = require("../schemas");

const Category = mongoose.model("Category", CategorySchema);

const categoryDAO = {
  async getIdByName(categoryName) {
    const { id } = await Category.findOne({
      category: categoryName,
    });

    return id;
  },
};

module.exports = categoryDAO;
