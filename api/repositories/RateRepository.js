const Bluebird = require('bluebird-global');

class RateRepository {

	constructor() {
		this._RateModel = Bluebird.promisifyAll(Rate);
	}

	create(data) {
		return Rate.create(data);
	}

	getList() {
		return this._RateModel.queryAsync(`
			select p.name as product, c.name as customer, r.rating as rate, r.feedback
			from rates r
			left outer join products p on r.productId = p.id
			left outer join customers c on r.customerId = c.id
			where p.status = 1 and c.status = 1
		`, []);
	}

	getDetail(id) {
		return Rate.findOne({
			id
		});
	}

	getRateReport(pageIndex) {
		const skip = 30 * (pageIndex - 1);
		return this._RateModel.queryAsync(`
				select r.rating, r.feedback, c.*, p.name as product from rates r
				left outer join customers c on r.customerId = c.id
				left outer join products p on r.productId = p.id
				limit 30 offset ${skip} order by r.id
			`, []);
	}

	remove(id) {
		return this._RateModel.destroyAsync({
			id: id
		});
	}

	update(data) {
		return Rate.update({
			id: data.id
		}, data);
	}
}

module.exports = RateRepository;
