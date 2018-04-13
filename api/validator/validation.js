class Validator {
	notEmpty(object) {
		if (Array.isArray(object)) {
			if (!object.length) { return { result: false, key: object }; }
			object.forEach(el => {
				return this.notEmpty(el);
			});
		} else {
			if (!object) { return { result: false, key: object }; }
			for (let key of Object.keys(object)) {
				if (!object[key]) {
					return { result: false, key };
				}
			}
		}
		// for (let key of object) {
		// 	if (!Array.isArray(object[key])) {
		// 		if (!object[key]) {
		// 			return { result: false, key };
		// 		}
		// 	} else {
		// 		object[key].forEach(el => {
		// 			return this.notEmpty(el);
		// 		});
		// 	}
		// }
		return { result: true };
	}
}

module.exports = Validator;