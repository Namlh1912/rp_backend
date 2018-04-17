const Bluebird = require('bluebird-global');

const SORT_STRING = 'id DESC';

class ProductRepository {
	constructor() {
		this._ProductModel = Bluebird.promisifyAll(Product);
	}

	create(data) {
		return Product.create(data);
	}

	getList() {
		return Product.find({ status: 1 }).sort(SORT_STRING);
	}

	getDetail(id) {
		return Product.findOne({ id: id, status: 1 });
	}

	getByCategory(categoryId) {
		return this._ProductModel.queryAsync(`
			select p.*, avg(r.rating) as rates from products p
			left outer join rates r on r.productId = p.id
			where p.categoryId = ${categoryId} and p.status = 1 group by p.id
		`, []);
	}

	remove(id) {
		return Product.destroy({ id: id });
	}

	removeByCat(id) {
		return Product.update({ categoryId: id }, { status: 0 });
	}

	update(index, data) {
		return Product.update(index, data);
	}

}

module.exports = ProductRepository;