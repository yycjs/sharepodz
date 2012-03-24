describe( 'sharpodz.test.unit.controllers.home', function() {

  var should = require( 'should' );
  var stub = require( 'stub.js' );
  var homeController = require( '../../../controllers/home' );

  var mockRequest = {};
  var mockResponse = { render: stub.sync() };

  var listings = [{
      images: ['one','two']
    },{
      images: ['three','four']
    }
  ];
  var expectedListing = [{
      images: ['one','two'],
      mainImage: 'one'
    }
  ];
  var expectedLatest = {
    images: ['three','four'],
    mainImage: 'three'
  }
  
  var mockListing = {
    find: stub.sync(null, {
        limit : stub.sync(null, {
            sort: stub.sync(null, {
              exec: stub.async(null, listings)
            })
        })
    })  
  };

  var mockApp = {
    models: {
      listing: {
        getModel: function() {
          return mockListing;
        }
      }
    }
  };

  describe( 'index', function() {
    it( 'should call the database and grab the first 7 listings', function( done ) {
      homeController.initialize( { app: mockApp } );

      homeController.index(mockRequest, mockResponse);
      mockListing.find.called.withAnyArguments();
      listings[0].mainImage.should.equal(expectedListing[0].mainImage);
      mockResponse.render.called.withArguments('index', {
        locals: {
          title: "Test",
          is_home: true,
          results: expectedListing,
          latest: expectedLatest
        }
      });

      done();
    } );
  } );
} );