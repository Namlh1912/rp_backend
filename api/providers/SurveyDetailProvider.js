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
		let questions = [];
		let headers = [];
		let dataEx = { name: '' };
		let data = [];
		return this.surveyDetailRepo.getQuestion().then(res => {
			questions = res;
			let ansProm = [];
			headers[0] = 'name';
			questions.forEach(ques => {
				ansProm.push(this.surveyDetailRepo.getListByQuestionId(ques.id));
				headers.push(ques.description);
				dataEx = Object.assign({}, dataEx, { [ques.description]: '' });
			});
			// sails.log.info(dataEx);
			return Promise.all(ansProm);
		}).then(ans => {
			// let i = 0;
			// questions.forEach(el => {
			// 	el.answers = ans[i];
			// 	i++;
			// });
			ans.forEach(el => {
				el.forEach(answer => {
					let input = Object.assign({}, dataEx, { [answer.description]: answer.answer, name: answer.name });
					data.push(input);
				});
			});
			// sails.log.info(data);
			return { headers, data };
		}).catch(err => sails.log.error(err));
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