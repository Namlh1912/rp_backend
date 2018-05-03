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
			select p.name as product, c.name as customer,c.email as email , c.phone as phone , r.rating as rate, f.feedback as feedback
      from rates r, feedbacks f
			left outer join products p on r.productId = p.id
      left outer join customers c on r.customerId = c.id
      left outer join customers c1 on c1.id = f.customerId
			left outer join categories cat on cat.id = f.categoryId
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
