describe( 'sharpodz.test.unit.controllers.home', function() {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var homeController = require( '../../../controllers/home' );

  var mockRequest = {};
  var mockResponse = { render: stub.sync() };

  var mockApp = {  };

  describe( 'index', function() {
    it( 'should call the database and grab the first 7 listings', function( done ) {
      homeController.initialize( mockApp );

      

      done();
    } );
  } );
} );