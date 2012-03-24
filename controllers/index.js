module.exports = (function () {
  var homeController;

  function initialize ( options ) {
    homeController = require( './home' );
    homeController.initialize( options );
  }

  return {
    initialize: initialize,
    home: homeController
  }
}());