const Bluebird = require('bluebird-global');


class CategoryRepository {

	constructor() {
		this._CategoryModel = Bluebird.promisifyAll(Category);
	}

	create(data) {
		return this._CategoryModel.create(data);
	}

	getList() {
		return this._CategoryModel.find({status: 1, sort: 'id DESC'});
	}

	getDetail(id) {
		return this._CategoryModel.findOne({ id, status: 1 });
	}

	update(data, index) {
		return Category.update(index, data);
	}

	remove(id) {
		return this._CategoryModel.destroyAsync({ id });
	}
}

module.exports = CategoryRepository;