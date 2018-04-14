const Bluebird = require('bluebird-global');

class SurveyDetailRepository {

	constructor() {
		this._SurveyDetailModel = Bluebird.promisifyAll(SurveyDetail);
	}

	create(data) {
		return SurveyDetail.create(data);
	}

	getListByQuestionId(id) {
		return this._SurveyDetailModel.queryAsync(`
			select sd.answer, c.name, sd.questionId, q.description
			from survey_details sd
			left outer join customers c on sd.customerId = c.id
			left outer join questions q on sd.questionId = q.id
			where sd.questionId = ${id}
		`, []);
	}

	getQuestion() {
		return this._SurveyDetailModel.queryAsync(`
			select q.description, q.id
			from survey_details sd
			left outer join questions q on sd.questionId = q.id
			group by sd.questionId
		`, []);
	}

	getDetail(id) {
		return SurveyDetail.findOne({
			id
		});
	}

	remove(id) {
		return this._SurveyDetailModel.destroyAsync({
			id: id
		});
	}

	update(data) {
		return SurveyDetail.update({
			id: data.id
		}, data);
	}
}

module.exports = SurveyDetailRepository;
