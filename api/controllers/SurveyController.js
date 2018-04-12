const moment = require('moment');

const SurveyProvider = require('../providers/SurveyProvider');
const ProductProvider = require('../providers/ProductProvider');
const ControllerBase = require('./ControllerBase');

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

	get productProvider() {
		if (!this._productProvider) {
			this._productProvider = new ProductProvider();
		}
		return this._productProvider;
	}

	create(request, response) {
		let surveyData = request.body;
		this.surveyProvider.create(surveyData)
			.then(survey => response.ok(survey))
			.catch(err => {
				sails.log.error(err);
				return response.serverError('Create Failed!');
			});
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
		let id = parseInt(request.param('id'));

		this.groupProvider.getGroupByTheme(id)
			.then(groups => {
				if (groups.length) {
					return {
						message: 'The following theme are used by other groups',
						themes: groups
					};
				}
				return this.surveyProvider.delete(id);
			})
			.then(deleted => {
				if (Array.isArray(deleted)) {
					response.ok({
						data: deleted
					});
				} else {
					response.forbidden(deleted);
				}
			})
			.catch(err => {
				sails.log.error(err);
				return response.serverError('Cannot remove this theme');
			});
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		this.surveyProvider.list().then(list => {
			return response.ok(list);
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Get brands list failed');
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
		// let body = request.body;
		// let assets = body['assets'];
		// let groups = body['groups'];
		// let detailAssets = [],
		// 	detailGroups = [];

		// body.theme['updatedAt'] = moment().format(TIME_FORMAT);
		// let theme = body.theme;

		// if (assets && assets.length || groups && groups.length) {
		// 	assets.forEach(el => {
		// 		el.theme_id = body.theme['id'];
		// 		detailAssets.push(this.themeDetailProvider.checkExistDetail(el));
		// 	});

		// 	groups.forEach(group => {
		// 		group.theme_id = body.theme['id'];
		// 		detailGroups.push(this.groupProvider.updateThemeId(group.groupId, group.theme_id));
		// 	});

		// 	Promise.all(detailAssets).then(() => {
		// 		this.updateTheme(theme, response);
		// 	}).catch(err => {
		// 		sails.log.error(err);
		// 		response.serverError('Update theme failed');
		// 	});
		// } else {
		// 	this.updateTheme(theme, response);
		// }

	}
}

module.exports = new SurveyController().exports();
