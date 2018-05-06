const CustomerRepository = require("../repositories/CustomerRepository");
const RateRepository = require("../repositories/RateRepository");

class RateProvider {
  constructor() {}

  get customerRepo() {
    if (!this._cusRepo) {
      this._cusRepo = new CustomerRepository();
    }
    return this._cusRepo;
  }

  get rateRepo() {
    if (!this._rateRepo) {
      this._rateRepo = new RateRepository();
    }
    return this._rateRepo;
  }

  create(data) {
    return this.rateRepo
      .create(data)
      .then(res => {
        return res;
      })
      .catch(err => sails.log.error(err));
  }

  async list() {
    const list = await this.rateRepo.getList();
    const listWithoutFeedback = await this.rateRepo.getListWithoutFeedback();
    const result = [...list, ...listWithoutFeedback];
    return result;
  }
}

module.exports = RateProvider;
