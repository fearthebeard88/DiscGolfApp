const abstractController = require('./Abstract');

module.exports = class indexController extends abstractController {
    template = TEMPLATE_BASE_DIR + 'home.html';
}