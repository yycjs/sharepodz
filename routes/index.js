module.exports = ( function () {
  var app;

  function initialize ( options ){
    app = options.app;

    app.get('/', app.controllers.home.index);
  }
}());