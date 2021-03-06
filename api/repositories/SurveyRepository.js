const Bluebird = require('bluebird-global');


class SurveyRepository {

	constructor() {
		this._SurveyModel = Bluebird.promisifyAll(Survey);
	}

	create(data) {
		return Survey.create(data)
		.then(res => res)
		.catch(err => {
			sails.log.error(err.message);
			return null;
		});
	}

	getList() {
		return Survey.find({ sort: 'id DESC', status: 1 })
			.then(res => {
				return res;
			})
			.catch(err => {
				sails.log.error(err);
			});
	}

	getDetail(id) {
		return Survey.findOne({ id, status: 1 });
	}

	getByName(name) {
		return Survey.find({
			title: {
				'like': `%${name}%`
			},
			status: 1
		});
	}

	update(data) {
		try {
			return this._SurveyModel.update({ id: data.id }, data);
		} catch(err) {
			sails.log.error(err);
			return null;
		}
	}

}

module.exports = SurveyRepository;