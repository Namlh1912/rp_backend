class Validator {
	notEmpty(object) {
		let result = { result: true };
		if (Array.isArray(object)) {
			if (!object.length) { 
				result = { result: false, key: object };
				return result;
			}
			object.forEach(el => {
				const res = this.notEmpty(el);
				if (!res.result) { 
					result = { result: false, key: res.key };
					return result;
				}
				// return ;
			});
		} else {
			if (object === '' || object === undefined || object === null) {
				result = { result: false, key: object };
				return result;
			}
			for (let key of Object.keys(object)) {
				if (object[key] === '' || object[key] === null || object[key] === undefined) {
					result = { result: false, key };
					return result;
				}
			}
		}

		return result;
	}
}

module.exports = Validator;