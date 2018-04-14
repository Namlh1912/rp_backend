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
			select * from survey_details
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
