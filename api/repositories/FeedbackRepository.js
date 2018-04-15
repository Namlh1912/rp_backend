const Blurebird = require('bluebird-global');

class FeedbackRepository {
	constructor() {
		this._FeedbackModel = Blurebird.promisifyAll(Feedback);
	}

	create(data) {
		return Feedback.create(data);
	}

	list() {
		return this._FeedbackModel.queryAsync(`
			select c.name as customer, cat.name as category, f.feedback
			from feedbacks f
			left outer join customers c on c.id = f.customerId
			left outer join categories cat on cat.id = f.categoryId
		`, []);
	}
}

module.exports = FeedbackRepository;
