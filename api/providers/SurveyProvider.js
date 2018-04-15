// const Bluebird = require('bluebird-global');
const moment = require('moment');

const SurveyRepository = require('../repositories/SurveyRepository');
const QuestionRepository = require('../repositories/QuestionRepository');
const QuestionProvider = require('./QuestionProvider');

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

	get questionProvider() {
		if (!this._questionPro) {
			this._questionPro = new QuestionProvider();
		}
		return this._questionPro;
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
			if (!data) {
				return Promise.reject(`Some field is missing`);
			}
			survey = newSurvey;
			// let questionProm = [];
			questionsData.forEach(el => {
				el.surveyId = newSurvey.id;
				// questionProm.push();
			});
			return this.questionRepo.create(questionsData);
		}).then(() => survey)
			.catch(err => sails.log.error(err));
	}

	detail(id) {
		return Promise.all([this.surveyRepo.getDetail(id), this.questionRepo.getBySurvey(id)])
			.then(([survey, questions]) => {
				questions.forEach(el => {
					let answers = el.answer && el.answer.split('#@#');
					el.answer = [];
					answers && answers.forEach(ans => el.answer.push(ans));
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
		let questionUpdateProm = [];
		let questionCreateProm = [];
		questions.forEach(ques => {
			ques.surveyId = data.id;
			if (ques.id) {
				questionUpdateProm.push(this.questionRepo.update(ques));
			} else {
				questionCreateProm.push(this.questionRepo.create(ques));
			}
		});

		// surveyProm.push(this.surveyRepo.update(data))
		return Promise.all([
			this.surveyRepo.update(data),
			Promise.all(questionUpdateProm),
			Promise.all(questionCreateProm)]).then(res => {
				return res;
			}).catch(err => {
				sails.log.error(err);
				return err;
			});
	}
}

module.exports = SurveyProvider;
