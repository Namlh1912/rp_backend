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
		return this._QuestionModel.queryAsync(`
			select q.*, t.type from questions q
			left outer join question_types t on q.questionType = t.id
			where q.surveyId = ${id}`, [])
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
