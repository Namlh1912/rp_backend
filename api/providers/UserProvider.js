// const Bluebird = require('bluebird-global');
const moment = require('moment');
const md5 = require('md5');

const UserRepository = require('../repositories/UserRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class UserProvider {

	constructor() {

	}

	get userRepo() {
		if (!this._repo) {
			this._repo = new UserRepository();
		}
		return this._repo;
	}

	create(data) {
		data.password = md5(data.password);
		return this.userRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => {
				sails.log.error(err);
				return err;
			});
	}

	checkUsername(name) {
		return this.userRepo.checkUsername(name);
	}

	delete(id) {
		return this.userRepo.remove(id).catch(err => sails.log.error(err));
	}

	detail(id) {
		return this.userRepo.getDetail(id).then(user => {
			this.removePrivateProp(user);
			return user;
		}).catch(err => sails.log.error(err));
	}

	async login(user) {
		user.password = md5(user.password);
		let loggedUser = await this.userRepo.login(user);
		if (loggedUser) {
			this.removePrivateProp(loggedUser);
			if (user.appToken) {
				await this.userRepo.update({ id: loggedUser.id, appToken: user.appToken });
				return loggedUser;
			}
			return loggedUser;
		}
		return null;
	}

	list() {
		return this.userRepo.getList().then(list => {
			list.forEach(user => this.removePrivateProp(user));
			return list;
		}).catch(err => sails.log.error(err));
	}

	update(data) {
		// data.updatedAt = moment().format(TIME_FORMAT);

		return this.userRepo.update(data).then(res => {
			let user = res[0];
			if (user) {
				this.removePrivateProp(user);
			}
			return user;
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}

	//#region private
	removePrivateProp(user) {
		delete user.password;
		delete user.googleId;
		delete user.roleId;
		return user;
	}
	//#endregion
}

module.exports = UserProvider;