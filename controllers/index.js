module.exports = (function () {
	var homeController;

	function initialize(options) {
		homeController = require('./home');
		homeController.initialize(options);
		logoutController = require('./logout');
		logoutController.initialize(options);
		return this;
	}

	return {
		initialize : initialize,
		home : homeController,
		logout : logoutController
	}
}());