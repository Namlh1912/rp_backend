const Bluebird = require('bluebird-global');

class QuestionRepository {

	constructor() {
		this._QuestionModel = Bluebird.promisifyAll(Question);
	}

	create(data) {
		return Question.create(data);
	}

	getList() {
		return Question.find({ where: { status: 1 } });
	}

	getDetail(id) {
		return Question.findOne({
			id,
			status: 1
		});
	}

	findOrCreate(data) {
		return Question.findOrCreate({
			id: data.id,
			status: 1
		}, data);
	}

	getBySurvey(id) {
		return Question.find({ surveyId: id, status: 1 })
			.then(res => res)
			.catch(err => sails.log.error(err));
	}

	remove(id) {
		return this._QuestionModel.destroyAsync({
			id: id
		});
	}

	removeBySurveyId(id) {
		return Question.update({ surveyId: id }, { status: 0 });
	}

	update(data) {
		return Question.update({
			id: data.id
		}, data);
	}
}

module.exports = QuestionRepository;
