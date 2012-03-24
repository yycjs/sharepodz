module.exports = ( function () {
  var app
  var Listing;

  function initialize ( options ){
    app = options.app;
    Listing = app.models.listing.getModel();
  }

  function index ( req, res, next ) {
    Listing.find( {} ).limit( 7 ).sort( 'created', -1 ).exec( function ( err, listings ) {

      for ( var i in listings ) {
        listings[i].mainImage = listings[i].images[0];
      }
      var latest = listings.pop();
      res.render( 'index', {
        locals: {
          title: "Test",
          is_home: true,
          results: listings,
          latest: latest
        }
      } );
    } );
  }

  return {
    initialize: initialize,
    index: index
  }
}());