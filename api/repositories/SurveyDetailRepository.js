const Bluebird = require('bluebird-global');

class SurveyDetailRepository {

	constructor() {
		this._SurveyDetailModel = Bluebird.promisifyAll(SurveyDetail);
	}

	create(data) {
		return SurveyDetail.create(data);
	}

	getList() {
		return SurveyDetail.find();
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
