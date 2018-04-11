const moment = require('moment');

const CustomerProvider = require('../providers/CustomerProvider');
const ControllerBase = require('./ControllerBase');

class CustomerController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [

		]
	}

	get customerProvider() {
		if (!this._provider) {
			this._provider = new CustomerProvider();
		}
		return this._provider;
	}

	create(request, response) {
		let body = request.body;
		this.customerProvider.create(body)
			.then(res => response.ok({ data: res }))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Cannot create this theme');
			});
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);

		Promise.all([
			this.customerProvider.detail(id),
			this.themeDetailProvider.getByThemeId(id),
			this.groupProvider.getGroupByTheme(id)
		])
			.then(([detail, assets, groups]) => {
				detail.assets = assets;
				detail.groups = groups;
				response.ok({ data: detail });
			})
			.catch(err => {
				response.serverError(`Get theme id ${id} failed`);
				sails.log.error(err);
			});
	}

	delete(request, response) {
		let id = parseInt(request.param('id'));
		this._provider.delete(id)
			.then(deleted => response.ok(deleted))
			.catch(err => {
				sails.log.error(err);
				return response.serverError(err);
			});
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		this.customerProvider.list().then(list => {
			if (list && list.length) {
				return response.ok({ data: list });
			}
			response.status(400);
			return response.send();
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Get customer list failed');
		});
	}

	update(request, response) {
		let customer = request.body;
		this._provider.update(customer).then(updated => {
			return response.ok(updated);
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Cannot update Customer');
		});
	}
}

module.exports = new CustomerController().exports();