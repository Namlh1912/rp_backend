// const Bluebird = require('bluebird-global');
const FeedbackRepository = require('../repositories/FeedbackRepository');

class FeedbackProvider {

	constructor() {

	}

	get feedbackRepo() {
		if (!this._repo) {
			this._repo = new FeedbackRepository();
		}
		return this._repo;
	}

	list() {
		return this.feedbackRepo.list();
	}

	create(data) {
		return this.feedbackRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => {
				sails.log.error(err);
				return err;
			});
	}

	// detail(id) {
	// 	return this.feedbackRepo.getDetail(id);
	// }

	// delete(id) {
	// 	return this.feedbackRepo.remove(id);
	// }

	// update(data) {
	// 	return this.feedbackRepo.update(data).then(res => {
	// 		return res[0];
	// 	}).catch(err => {
	// 		sails.log.error(err);
	// 		return err;
	// 	});
	// }
}

module.exports = FeedbackProvider;
