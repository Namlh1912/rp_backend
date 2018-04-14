// const Bluebird = require('bluebird-global');
const moment = require('moment');

const SurveyRepository = require('../repositories/SurveyRepository');
const QuestionRepository = require('../repositories/QuestionRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class SurveyProvider {

	constructor() {

	}

	get surveyRepo() {
		if (!this._repo) {
			this._repo = new SurveyRepository();
		}
		return this._repo;
	}

	get questionRepo() {
		if (!this._questionRepo) {
			this._questionRepo = new QuestionRepository();
		}
		return this._questionRepo;
	}

	list() {
		return this.surveyRepo.getList();
	}

	create(data) {
		const questionsData = data.questions;
		let survey;
		return this.surveyRepo.create(data).then(newSurvey => {
			if(!data) {
				return null;
			}
			survey = newSurvey;
			let questionProm = [];
			questionsData.forEach(el => {
				el.surveyId = newSurvey.id;
				questionProm.push(this.questionRepo.create(el));
			});
			return Promise.all(questionProm);
		}).then(() => survey)
			.catch(err => sails.log.error(err));
	}

	detail(id) {
		return Promise.all([this.surveyRepo.getDetail(id), this.questionRepo.getBySurvey(id)])
			.then(([survey, questions]) => {
				questions.forEach(el => {
					let answers = el.answer && el.answer.split('#@#');
					el.answer = [];
					answers && answers.forEach(ans => el.answer.push({ title: ans }));
				});
				survey.questions = questions;
				return survey;
			}).catch(err => sails.log.error(err));
	}

	delete(id) {
		return this.themeDetailRepo.removeByTheme(id).then(() => {
			return this.surveyRepo.remove(id);
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}

	getByName(name) {
		return this.surveyRepo.getByName(name);
	}

	update(data) {
		const questions = data.questions;
		let questionProm = [];
		questions.forEach(ques => {
			questionProm.push(this.questionRepo.update(ques));
		});

		// surveyProm.push(this.surveyRepo.update(data))
		return Promise.all([this.surveyRepo.update(data), Promise.all(questionProm)]).then(res => {
			return res;
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}
}

module.exports = SurveyProvider;
