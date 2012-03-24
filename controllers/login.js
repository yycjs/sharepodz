module.exports = ( function () {

  function initialize ( options ){
    var app = options.app;
  }

  function index ( req, res, next ) {
    res.render('login');
  }

  return {
    initialize: initialize,
    index: index
  }
}());
