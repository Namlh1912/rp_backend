const ProductRepository = require("../repositories/ProductRepository");
const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryProvider {
  constructor() {}

  get categoryRepo() {
    if (!this._repo) {
      this._repo = new CategoryRepository();
    }
    return this._repo;
  }

  get productRepo() {
    if (!this._productRepo) {
      this._productRepo = new ProductRepository();
    }
    return this._productRepo;
  }

  create(data) {
    // data.status = 1;
    return this.categoryRepo.create(data);
  }

  delete(id) {
    let index = { id };
    return Promise.all([
      this.categoryRepo.update({ status: 0 }, index),
      this.productRepo.removeByCat(id)
    ]);
  }

  detail(id) {
    return this.categoryRepo.getDetail(id);
  }

  list() {
    return this.categoryRepo.getList();
  }

  listByName(name) {
    return this.categoryRepo.getByName(name);
  }

  update(data) {
    return this.categoryRepo
      .getDetail(data.id)
      .then(button => {
        if (button) {
          let index = { id: data.id };
          return this.categoryRepo.update(data, index);
        }
      })
      .then(updated => updated);
  }
}

module.exports = CategoryProvider;
