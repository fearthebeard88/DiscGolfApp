const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const {utility} = require('./helpers/utility.js');

const CONTROLLER_BASE_PATH = './Controllers/';

http.createServer((request, response) => {
    var controller;
    var action;
    var params = {};
	params['params'] = [];
    var requestParts = request.url.split('?'); // Break off any query string
	var requestUrl = requestParts[0];
	if (requestParts.length > 1) {
		var queryParts = requestParts[1].split('&');
		for (let i = 0, count = queryParts.length; i < count; ++i) {
			let query = queryParts.split('=');
			if (query.length == 2) {
				params[query[0]] = query[1];
			}
		}
	}

	var controllerObjModule = null;
	var controllerObj = null;
	if (requestUrl == '/') {
		controller = 'index';
		action = 'index';
		controllerObjModule = require(`${CONTROLLER_BASE_PATH}${controller}.js`);
		controllerObj = new controllerObjModule(request, response);
	} else {
		var requestUrlParts = requestUrl.split('/');
		requestUrlParts.splice(0, 1); // Remove the empty string from the split
		var controllerFilesArrayRaw = fs.readdirSync(path.join(__dirname, 'Controllers'));
		var controllerFilesArray = [];
		controllerFilesArrayRaw.forEach((controllerFile) => {
			controllerFilesArray.push(controllerFile.replace(/\.js$/, '').toLowerCase());
		});

		controller = requestUrlParts.splice(0, 1)[0].toLowerCase();
		if (controller == 'abstract' || !controllerFilesArray.includes(controller)) {
			controller = 'notFound';
		}

		controllerObjModule = require(`${CONTROLLER_BASE_PATH}${controller}.js`);
		controllerObj = new controllerObjModule(request, response);
		action = requestUrlParts.splice(0, 1)[0].toLowerCase();
		if (typeof controllerObj[action] !== 'function') {
			requestUrlParts.unshift(action);
			action = 'index';
		}

		if (requestUrlParts.length % 2 !== 0) {
			for (let i = 0, count = requestUrlParts.length; i < count; i = i + 2) {
				params[requestUrlParts[i]] = requestUrlParts[i + 1];
			}
		}
	}

	controllerObj.params = params;
	controllerObj.dispatch(action);
	response.end();
}).listen(port);
console.log(`Server running on port ${port}`);