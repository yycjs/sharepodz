module.exports = (function () {
	var app;

	function initialize(options) {
		app = options.app;
	}

	function index(req, res) {
		req.logout();
		res.redirect('/');
	}

	return {
		initialize : initialize,
		index : index
	}
})();