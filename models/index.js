module.exports = (function () {
  var listing;

  function initialize ( options ) {
    listing = require( './listing' );
    listing.initialize( options );
  }

  return {
    initialize: initialize,
    listing: listing
  }
}());