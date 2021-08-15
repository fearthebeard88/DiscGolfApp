const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const {utility} = require('./helpers/utility.js');

const CONTROLLER_BASE_PATH = './Controllers/';

http.createServer((request, response) => {
    var controller;
    var action;
    var params = [];
    var requestParts = request.url.split('/');
    for (let i = 0, count = requestParts.length; i < count; ++i) {
        let part = requestParts[i];
        if (part.trim() == '') {
            if (controller == undefined) {
                controller = 'index';
            }

            if (action == undefined) {
                action = 'index';
            }

            break;
        }

        if (controller == undefined) {
            controller = part.trim().toLowerCase();
            continue;
        }

        if (action == undefined) {
            action = part.trim().toLowerCase();
            continue;
        }

        // If we get here we already parsed out our controller and action
        // and the rest gets added to params
        params.push(part.trim());
    }

    if (!fs.existsSync(CONTOLLER_BASE_PATH + controller + '.js')) {
        controller = 'notFound';
        action = 'index';
    }

    request.controllerString = controller;

    var controllerObj = require(CONTROLLER_BASE_PATH + controller + '.js')
    if (typeof controllerObj.action == undefined || typeof controllerObj.action != 'function') {
        action = 'index';
    }

    request.actionString = action;
    request.params = params;
    var controllerResponse = controllerObj.dispatch(request);
}).listen(port);
console.log(`Server running on port ${port}`);