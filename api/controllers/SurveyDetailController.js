const moment = require('moment');

const SurveyDetailProvider = require('../providers/SurveyDetailProvider');
const ControllerBase = require('./ControllerBase');

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

	create(request, response) {
		let surveyData = request.body;
		let answer = '';
		let surveyDetailProm = [];
		surveyData.forEach(sur => {
			sur.answers.forEach(ans => {
				answer += ans + ', ';
			});
			sur.answer = answer;
			surveyDetailProm.push(this.surveyDetailProvider.create(sur));
		});

		Promise.all(surveyDetailProm).then(() => {
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
