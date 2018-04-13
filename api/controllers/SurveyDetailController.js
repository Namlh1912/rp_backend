const moment = require('moment');

const SurveyDetailProvider = require('../providers/SurveyDetailProvider');

const CustomerProvider = require('../providers/CustomerProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

class SurveyController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			'searchByName'
		]
	}

	get surveyDetailProvider() {
		if (!this._provider) {
			this._provider = new SurveyDetailProvider();
		}
		return this._provider;
	}

	get customerProvider() {
		if (!this._provider) {
			this._provider = new CustomerProvider();
		}
		return this._provider;
	}

	get validator() {
		if (!this._validator) {
			this._validator = new Validator();
		}
		return this._validator;
	}

	create(request, response) {
		let surveyData = request.body['survey'];
		let validateRes = this.validator.notEmpty(surveyData);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }

		const customer = request.body['customer'];
		validateRes = this.validator.notEmpty(customer);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
		let surveyDetailProm = [];
		this.customerProvider.create(customer).then(cus => {
			surveyData.forEach(sur => {
				sur.customerId = cus.id;
				surveyDetailProm.push(this.surveyDetailProvider.create(sur));
			});
			return Promise.all(surveyDetailProm);
		}).then(() => {
			response.status(204);
			return response.send();
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Create Failed!');
		});
	}

	getNow() {
		return moment().utc();
	}

	async list(request, response) {
		try {
			let list = await this.surveyDetailProvider.list();
			return response.ok(list);
		} catch (err) {
			sails.log.error(err);
			return response.serverError('Get brands list failed');
		}
		// if (list && list.length) {
		// 	let brandProm = [];
		// 	list.forEach(brand => {
		// 		brand.products = [];
		// 		brandProm.push(this.productProvider.getByCategory(brand.id));
		// 	});
		// 	let brandProducts = await Promise.all(brandProm);
		// 	brandProducts.forEach(products => {
		// 		if(products.length) {
		// 			let index = list.findIndex(el => el.id == products[0].brandId);
		// 			list[index].products = products;
		// 		}
		// 	});
		// }
	}
}

module.exports = new SurveyController().exports();
