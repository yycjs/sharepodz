module.exports = ( function () {
  var app;

  function initialize ( options ){
    app = options.app;
	app.get('/login', app.controllers.login.index);
    app.get('/', app.controllers.home.index);
  }
}());
