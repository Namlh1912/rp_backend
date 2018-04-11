const Bluebird = require('bluebird-global');


class SurveyRepository {

	constructor() {
		this._SurveyModel = Bluebird.promisifyAll(Survey);
	}

	create(data) {
		return Survey.create(data);
	}

	getList() {
		return Survey.find({ sort: 'id DESC' })
			.then(res => {
				return res;
			})
			.catch(err => {
				sails.log.error(err);
			});
	}

	getDetail(id) {
		return Survey.findOne({ id });
	}

	getByName(name) {
		return Survey.find({
			name: {
				'like': `%${name}%`
			}
		});
	}

	update(data) {
		return this._SurveyModel.update({ id: data.id }, data);
	}

	remove(SurveyId) {
		return this._SurveyModel.destroyAsync({ id: SurveyId });
	}

}

module.exports = SurveyRepository;