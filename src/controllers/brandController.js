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

    await brandService.createBrand({ origin, korean, picture });

    res.end();
  },

  async updateBrand(req, res) {
    const { brandId, originName: origin, koreanName: korean } = req.body;
    const { file } = req;

    await brandService.updateBrandByBrandId(brandId, { origin, korean, file });

    res.end();
  },

  async deleteBrandByBrandId(req, res) {
    const { brandId } = req.params;

    await brandService.deleteBrandByBrandId(brandId);
    res.end();
  },
};

module.exports = brandController;
