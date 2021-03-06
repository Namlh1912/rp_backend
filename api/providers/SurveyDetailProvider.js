// const moment = require('moment');
const SurveyDetailRepository = require('../repositories/SurveyDetailRepository');

class SurveyDetailProvider {
	constructor() {

	}

	get surveyDetailRepo() {
		if (!this._surveyDetail) {
			this._surveyDetail = new SurveyDetailRepository()
		}
		return this._surveyDetail;
	}

	list() {
		return this.surveyDetailRepo.getList();
	}

	create(detail) {
		return this.surveyDetailRepo.create(detail);
	}

	getBySurveyId(surveyId) {
		return this.surveyDetailRepo.getBySurveyId(surveyId);
	}

	remove(id) {
		return this.surveyDetailRepo.remove(id).then(res => res)
			.catch(err => {
				sails.log.error(err);
				return err;
			});
	}

}

module.exports = SurveyDetailProvider;