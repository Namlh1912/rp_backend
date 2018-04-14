class Validator {
	notEmpty(object) {
		if (Array.isArray(object)) {
			if (!object.length) { return { result: false, key: object }; }
			object.forEach(el => {
				const res = this.notEmpty(el);
				if (!res.result) { return { result: false, key: res.key }; }
				// return ;
			});
		} else {
			if (!object) { return { result: false, key: object }; }
			for (let key of Object.keys(object)) {
				if (!object[key]) {
					return { result: false, key };
				}
			}
		}

		return { result: true };
	}
}

module.exports = Validator;