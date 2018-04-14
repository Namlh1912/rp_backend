const moment = require('moment');
// const Bluebird = require('bluebird-global');
const json2csv = require('json2csv').Parser;
// const Json2csvTransform = require('json2csv').Transform;
// const fs = require('fs');

const SurveyDetailProvider = require('../providers/SurveyDetailProvider');

const CustomerProvider = require('../providers/CustomerProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');
// const json2csvAsync = Bluebird.promisifyAll(json2csv);

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
		if (!this._cusProvider) {
			this._cusProvider = new CustomerProvider();
		}
		return this._cusProvider;
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

			const json2csvParser = new json2csv({ fields: list.headers });
			let csv = json2csvParser.parse(list.data);

			return response.ok(csv);
			// const filename = "report-" + moment().format("YYYY-MM-DD") + ".csv";
			// response.attachment(filename);
			// return response.send(csv, 'UTF-8');
			// json2csv(config, (err, csv) => {
			// 	// if (err) console.log(err);
			// 	// var filename = "report-" + moment().format("YYYY-MM-DD") + ".csv";
			// 	// res.attachment(filename);
			// 	// res.end(csv, 'UTF-8');
			// 	var filename = "report-" + moment().format("YYYY-MM-DD") + ".csv";
			// 	response.attachment(filename);
			// 	return response.send(csv, 'UTF-8');
			// });

		} catch (err) {
			sails.log.error(err);
			return response.serverError('Get csv list failed');
		}
	}
}

module.exports = new SurveyController().exports();
