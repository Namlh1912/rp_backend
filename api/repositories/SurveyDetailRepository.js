const Bluebird = require('bluebird-global');

class SurveyDetailRepository {

	constructor() {
		this._SurveyDetailModel = Bluebird.promisifyAll(SurveyDetail);
	}

	create(data) {
		return SurveyDetail.create(data);
	}

	getList() {
		return this._SurveyDetailModel.queryAsync(`
			select q.description as question, sd.answer, c.name
			from survey_details sd
			left outer join questions q on sd.questionId = q.id
			left outer join customers c on sd.customerId = c.id
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
