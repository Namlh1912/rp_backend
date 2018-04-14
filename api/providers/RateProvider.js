const moment = require('moment');

const CustomerRepository = require('../repositories/CustomerRepository');
const RateRepository = require('../repositories/RateRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class RateProvider {

	constructor() {

	}

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
		return this.rateRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => sails.log.error(err));
	}

	list() {
		return this.rateRepo.getList();
	}

}

module.exports = RateProvider;