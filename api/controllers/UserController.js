// const moment = require('moment');
const jwt = require('jsonwebtoken');
// const Bluebird = require('bluebird-global');

const UserProvider = require('../providers/UserProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

const SECRET = '123456abc';
const ISSUER = 'http://localhost:1337';

class UserController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			'login'
		]
	}

	get userProvider() {
		if (!this._provider) {
			this._provider = new UserProvider();
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
		let body = request.body;
		let validateRes = this.validator.notEmpty(body);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }

		this.userProvider.checkUsername(body.username).then(check => {
			if (check) {
				return response.forbidden('This username is being used!');
			}
			return this.userProvider.create(body);
		}).then(res => {
			if (res.id) { return response.ok(res); }
		}).catch(err => {
			sails.log.error(err);
			response.serverError('Cannot create this user');
		});
	}

	delete(request, response) {
		let id = parseInt(request.param('id'), 10);

		this.userProvider.delete(id).then(res => {
			response.ok({
				data: res
			});
		}).catch(err => {
			sails.log.error(err);
			response.serverError('Cannot delete this user');
		});
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);

		this.userProvider.detail(id).then(detail => {
			response.ok(detail);
		}).catch(err => {
			response.serverError(`Get user id ${id} failed`);
			sails.log.error(err);
		});
	}

	list(request, response) {
		this.userProvider.list()
			.then(res => response.ok(res))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Get devices failed');
			});
	}

	update(request, response) {
		let user = request.body;
		let validateRes = this.validator.notEmpty(user);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }
		this.userProvider.update(user).then(res => {
			response.ok(res);
		}).catch(err => {
			response.serverError(`Update devices failed`);
			sails.log.error(err);
		});
	}

	login(request, response) {
		let client = request.body;
		if (!client.username || !client.password) {
			return response.badRequest('Cannot find this user');
		}
		this.userProvider.login(client).then(user => {
			if (!user) {
				return response.forbidden('Login failed');
			}
			return this.createToken(user);
		}).then(authUser => {
			if (authUser.id) {
				return response.ok(authUser);
			}
		}).catch(ex => {
			sails.log.error('login', ex.stack);
			return response.serverError('Login failed');
		});
	}

	//#region private
	createToken(user) {
		let sign = new Promise((resolve, reject) => {
			jwt.sign(
				// Data
				{
					userId: user.id,
					name: user.username
				},
				// Secret
				SECRET,
				// Config
				{
					issuer: ISSUER,
				},
				// Callback
				(err, token) => {
					if (err) {
						return reject(err)
					}
					if (token) {
						user.token = token;
						return resolve(user);
					}
				});
		});
		return sign;
	}

	//#endregion
}

module.exports = new UserController().exports();
