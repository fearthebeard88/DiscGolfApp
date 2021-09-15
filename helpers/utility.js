module.exports = {
    cleanString: (input, type) => {
        let dirtyPattern = /[^a-zA-Z0-9\?\&\=\'\"]?/g
        if (type == undefined) {
			// TODO: Constants for different types of string cleaning
		}

        return input.replace(dirtyPattern);
    },
	isNullOrEmpty: (input) => {
		var isNullOrEmpty = false;
		switch (typeof input) {
			case undefined:
			case null: 
				isNullOrEmpty = true;
				break;
			case 'boolean':
			case 'number':
			case 'bigint':
			case 'symbol':
			case 'function':
				isNullOrEmpty = false;
				break;
			case 'string':
				isNullOrEmpty = input.trim() == '';
				break;
			case 'object':
				isNullOrEmpty = _objIsNullOrEmpty(input);
				break;
			default:
				isNullOrEmpty = true;
				break;
		}

		return isNullOrEmpty;
	},
	_objIsNullOrEmpty: (input) => {
		var props = Object.keys(input);
		if (typeof props == undefined || typeof props == null || props.length == 0) {
			return true;
		}

		let isNullOrEmpty = true;
		for (let i = 0, count = props.length; i < count; ++i) {
			let key = props[i];
			let val = input[key];
			if (isNullOrEmpty(val) == false) {
				isNullOrEmpty = false;
				break;
			}
		}

		return isNullOrEmpty;
	}
}