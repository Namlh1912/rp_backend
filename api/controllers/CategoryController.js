const moment = require('moment');
// const Bluebird = require('bluebird-global');

const CategoryProvider = require('../providers/CategoryProvider');
const ProductProvider = require('../providers/ProductProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

class CategoryController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			'listByName'
		]
	}

	get categoryProvider() {
		if (!this._provider) {
			this._provider = new CategoryProvider();
		}
		return this._provider;
	}

	get productProvider() {
		if (!this._productProvider) {
			this._productProvider = new ProductProvider();
		}
		return this._productProvider;
	}

	get validator() {
		if (!this._validator) {
			this._validator = new Validator();
		}
		return this._validator;
	}

	create(request, response) {
		try {
			const category = request.body;
			const validateRes = this.validator.notEmpty(category);
			if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
			this.categoryProvider.create(category)
				.then(res => {
					return response.ok(res);
				})
				.catch(err => {
					sails.log.error(err);
					return response.serverError('Cannot create this category');
				});
		} catch(err) {
			sails.log.error(err);
			return response.badRequest();
		}
	}

	delete(request, response) {
		let id = parseInt(request.param('id'), 10);
		this.categoryProvider.delete(id).then(res => {
			response.ok(res);
		}).catch(err => {
			sails.log.error(err);
			response.serverError('Cannot delete this category');
		});
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);
		Promise.all([this.categoryProvider.detail(id), this.productProvider.getByCategory(id)])
			.then(([detail, products]) => {
				detail.products = products;
				return response.ok(detail);
			}).catch(err => {
				sails.log.error(err);
				return response.serverError(`Get category id ${id} failed`);
			});
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		this.categoryProvider.list()
			.then(res => response.ok(res))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Get categories failed');
			});
	}

	listByName(request, response) {
		let name = request.param('name');
		if (name) {
			this.categoryProvider.listByName(name).then(res => {
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
		let body = request.body;
		const validateRes = this.validator.notEmpty(body);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
		this.categoryProvider.update(body).then(res => {
			if (res) {
				return response.ok(res);
			}
			return response.notFound('Cannot find this category');
		}).catch(err => {
			sails.log.error(err);
			return response.serverError(`Update Category failed`);
		});
	}
}

module.exports = new CategoryController().exports();
