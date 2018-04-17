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
			select c.name as customer, c.company, c.phone, c.city, c.business, sd.* from survey_details sd
			left outer join customers c on c.id = sd.customerId
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
