const Bluebird = require('bluebird-global');

class QuestionRepository {

	constructor() {
		this._QuestionModel = Bluebird.promisifyAll(Question);
	}

	create(data) {
		return Question.create(data);
	}

	getList() {
		return Question.find();
	}

	getDetail(id) {
		return Question.findOne({
			id
		});
	}

	getBySurvey(id) {
		return Question.find({surveyId: id})
			.then(res => res)
			.catch(err => sails.log.error(err));
	}

	remove(id) {
		return this._QuestionModel.destroyAsync({
			id: id
		});
	}

	update(data) {
		return Question.update({
			id: data.id
		}, data);
	}
}

module.exports = QuestionRepository;
