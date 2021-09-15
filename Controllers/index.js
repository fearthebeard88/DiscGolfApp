const abstractController = require('./Abstract');

module.exports = class indexController extends abstractController {
    template = this.TEMPLATE_BASE_DIR + 'home.html';

	index() {
		this.response.write('Hello World');
	}
}