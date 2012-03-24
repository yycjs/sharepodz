describe( 'sharpodz.test.unit.controllers.logout', function() {

	var should = require( 'should' ),
		stub = require( 'stub.js' ),
		logoutController = require( '../../../controllers/logout' ),
		mockRequest = { logout : stub.sync() },
		mockResponse = { redirect : stub.sync() };

	var mockApp = {};

	describe('index', function() {
		it( 'should call req.logout and redirect to /', function( done ) {
			logoutController.index(mockRequest, mockResponse);
			mockRequest.logout.called.withNoArgument();
			mockResponse.redirect.called.withArguments('/');
			done();
		} );
	} );
} );