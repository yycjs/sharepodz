describe( 'sharpodz.test.unit.controllers.login', function() {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var loginController = require( '../../../controllers/login' );

  var mockRequest = {};
  var mockResponse = { render: stub.sync() };

  var mockApp = {  };

  describe( 'index', function() {
    it( 'should call render with login', function( done ) {
      loginController.initialize( mockApp );
		loginController.index( mockRequest, mockResponse, null );
		mockResponse.render.called.withArguments('login');
      done();
    } );
  } );
} );
