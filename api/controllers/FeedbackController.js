const json2csv = require('json2csv').Parser;

const FeedbackProvider = require('../providers/FeedbackProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

// const SERVER = 'http://localhost:1337';

class OrderController extends ControllerBase {
	constructor() {
		super()
		this._exportedMethods = []
	}

	get feedbackProvider() {
		if (!this._feedbackProvider) {
			this._feedbackProvider = new FeedbackProvider();
		}
		return this._feedbackProvider;
	}

	get validator() {
		if (!this._validator) {
			this._validator = new Validator();
		}
		return this._validator;
	}

	async list(request, response) {
		try {
			let list = await this.feedbackProvider.list();
			const fields = ['customer', 'category', 'feedback'];
			const json2csvParser = new json2csv({ fields });
			let csv = json2csvParser.parse(list);
			return response.ok(csv);
		} catch (err) {
			sails.log.error(err);
			return response.serverError('Get csv list failed');
		}
	}

}

module.exports = new OrderController().exports()
