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

		surveyData.questions.forEach(sur => {
			sur.survey = surveyData.title;
		});
		Promise.all([
			this.customerProvider.create(customer),
			this.surveyDetailProvider.create(surveyData.questions)
		]).then(() => {
			response.status(204);
			return response.send();
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Create Failed!');
		});
		// this.customerProvider.create(customer).then(cus => {

		// 	return Promise.all(surveyDetailProm);
		// }).then(() => {
		// 	response.status(204);
		// 	return response.send();
		// }).catch(err => {
		// 	sails.log.error(err);
		// 	return response.serverError('Create Failed!');
		// });
	}

	getNow() {
		return moment().utc();
	}

	async list(request, response) {
		try {
			let list = await this.surveyDetailProvider.list();
			const fields = ['customer', 'survey', 'question', 'answer'];
			const json2csvParser = new json2csv({ fields });
			let csv = json2csvParser.parse(list);

			return response.ok(csv);
		} catch (err) {
			sails.log.error(err);
			return response.serverError('Get csv list failed');
		}
	}
}

module.exports = new SurveyController().exports();
