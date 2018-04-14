const moment = require('moment');

const SurveyProvider = require('../providers/SurveyProvider');
// const ProductProvider = require('../providers/ProductProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

class SurveyController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			'searchByName'
		]
	}

	get surveyProvider() {
		if (!this._provider) {
			this._provider = new SurveyProvider();
		}
		return this._provider;
	}

	// get productProvider() {
	// 	if (!this._productProvider) {
	// 		this._productProvider = new ProductProvider();
	// 	}
	// 	return this._productProvider;
	// }

	get validator() {
		if (!this._validator) {
			this._validator = new Validator();
		}
		return this._validator;
	}

	create(request, response) {
		let surveyData = request.body;
		let validateRes = this.validator.notEmpty(surveyData);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
		try {
			this.surveyProvider.create(surveyData)
				.then(survey => {
					if(survey) {
						return response.ok(survey)
					}
					return response.badRequest();
				})
				.catch(err => {
					sails.log.error(err);
					return response.serverError('Create Failed!');
				});
		} catch(err) {
			return response.badRequest(err.message);
		}
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);
		this.surveyProvider.detail(id).then(detail => {
			if (detail) {
				return response.ok(detail)
			}
			return response.notFound();
		}).catch(err => {
			response.serverError(`Get survey id ${id} failed`);
			sails.log.error(err);
		});
	}

	delete(request, response) {
		// let id = parseInt(request.param('id'));

		// this.groupProvider.getGroupByTheme(id)
		// 	.then(groups => {
		// 		if (groups.length) {
		// 			return {
		// 				message: 'The following theme are used by other groups',
		// 				themes: groups
		// 			};
		// 		}
		// 		return this.surveyProvider.delete(id);
		// 	})
		// 	.then(deleted => {
		// 		if (Array.isArray(deleted)) {
		// 			response.ok({
		// 				data: deleted
		// 			});
		// 		} else {
		// 			response.forbidden(deleted);
		// 		}
		// 	})
		// 	.catch(err => {
		// 		sails.log.error(err);
		// 		return response.serverError('Cannot remove this theme');
		// 	});
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		this.surveyProvider.list().then(list => {
			return response.ok(list);
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Get surveys list failed');
		});
	}

	searchByName(request, response) {
		let name = request.param('name');
		if (name) {
			this.surveyProvider.getByName(name).then(res => {
				if (res.length) {
					return response.ok(res);
				} else {
					return response.notFound({
						message: 'No matches'
					});
				}
			}).catch(err => {
				sails.log.error(new Error(err));
				response.serverError({
					message: 'No matches.'
				})
			});
		}
	}


	update(request, response) {
		const survey = request.body;
		let validateRes = this.validator.notEmpty(survey);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
		this.surveyProvider.update(survey).then(() => {
			response.status(204);
			return response.send();
		}).catch(err => {
			sails.log.error(err);
			return response.serverError(err.message);
		});
	}
}

module.exports = new SurveyController().exports();
