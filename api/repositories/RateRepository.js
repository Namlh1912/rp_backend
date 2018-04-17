const Bluebird = require("bluebird-global");

class RateRepository {
  constructor() {
    this._RateModel = Bluebird.promisifyAll(Rate);
  }

  create(data) {
    return Rate.create(data);
  }

  getList() {
    return this._RateModel.queryAsync(
      `
			select p.name as product, c.name as customer,c.email as email , c.phone as phone ,  r.rating as rate
			from rates r
			left outer join products p on r.productId = p.id
			left outer join customers c on r.customerId = c.id
		`,
      []
    );
  }

  getDetail(id) {
    return Rate.findOne({
      id
    });
  }

  remove(id) {
    return this._RateModel.destroyAsync({
      id: id
    });
  }

  update(data) {
    return Rate.update(
      {
        id: data.id
      },
      data
    );
  }
}

module.exports = RateRepository;
