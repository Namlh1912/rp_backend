const Blurebird = require('bluebird-global');


class CustomerRepository {
	constructor() {
		this._CustomerModel = Blurebird.promisifyAll(Customer);
	}

	create(data) {
		return Customer.create(data);
	}

	getList() {
		return Customer.find({status: 1});
	}

	getDetail(id) {
		return Customer.findOne({ id: id, status: 1 });
	}

	update(data) {
		return Customer.update({ id: data.id }, data);
	}

	remove(id) {
		return Customer.destroyAsync({ id: id });
	}
}

module.exports = CustomerRepository;