const { brandService } = require('../services');

const brandController = {
  async getAllBrands(req, res) {
    const brands = await brandService.getAllBrands();

    res.json({ brands });
  },

  async getBrand(req, res) {
    const { target } = req.params;
    const brand = await brandService.getBrand(target);

    res.json({ brand });
  },

  async createBrand(req, res) {
    const { originName: origin, koreanName: korean } = req.body;
    const { path } = req.file;
    const picture = path.split('public')[1];

    const brand = await brandService.createBrand({ origin, korean, picture });

    res.status(201).json({ brand });
  },

  async updateBrand(req, res) {
    const { target, originName: origin, koreanName: korean } = req.body;
    const { file } = req;
    const path = file && file.path;
    const picture = path && path.split('public')[1];

    await brandService.updateBrand(target, { origin, korean, picture });

    res.status(201).end();
  },

  async deleteBrand(req, res) {
    const { target } = req.params;

    const deletedCount = await brandService.deleteBrand(target);
    res.json({ deletedCount });
  },
};

module.exports = brandController;
