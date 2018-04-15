const QuestionProvider = require('../providers/QuestionProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

class QuestionController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [

		]
	}

	get questionProvider() {
		if (!this._provider) {
			this._provider = new QuestionProvider();
		}
		return this._provider;
	}

	get validator() {
		if (!this._validator) {
			this._validator = new Validator();
		}
		return this._validator;
	}

	// create(request, response) {
	// 	let body = request.body;
	// 	const validateRes = this.validator.notEmpty(body);
	// 	if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
	// 	this.questionProvider.create(body).then(created => response.ok())
	// }

	update(request, response) {
		let body = request.body;
		const validateRes = this.validator.notEmpty(body);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
		this.questionProvider.update(body).then(res => {
			if (res) {
				return response.ok(res);
			}
			return response.notFound('Cannot find this question');
		}).catch(err => {
			sails.log.error(err);
			return response.serverError(`Update question failed`);
		});
	}
}

module.exports = new QuestionController().exports();
