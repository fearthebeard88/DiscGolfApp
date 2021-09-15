const {utility} = require('../helpers/utility.js');

module.exports = class abstractController {
    TEMPLATE_BASE_DIR = '../Templates/';

    template = null;
	request = null;
	response = null;
	params = null;

    constructor(request, response) {
		this.request = request;
		this.response = response;
    }

    dispatch(action) {
        
    }

	getParam(key) {
		if (key != undefined && this.request.params.hasOwnProperty(key)) {
			return utility.cleanString(this.request.params[key]);
		}

		if (this.request.params.params.length <= 0) {
			return null;
		}

		var paramsList = [];
		for (let [index, value] of Object.entries(this.request.params.params)) {
			paramsList.push(utility.cleanString(value));
		}

		return paramsList;
	}
}