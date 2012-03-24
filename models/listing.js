module.exports = (function () {
  var app;
  var name = 'Listing';
  var model;
  var schema;

  function initialize ( options ) {
    app = options.app;
    var ObjectId = app.mongoose.ObjectId;

    var Schema = app.mongoose.Schema;
    schema = new Schema( {
      owner: ObjectId,
      name: {type: String},
      tagline: {type: String},
      description: {type: String},
      city: {type: String},
      province: {type: String},
      address1: {type: String},
      address2: {type: String},
      postalCode: {type: String},
      location: {type: Array, index: "2d"},
      phone: {type: String},
      website: {type: String},
      twitter: {type: String},
      email: {type: String},
      created: {type: Date, 'default': Date.now},
      startDate: {type: Date, 'default': Date.now},
      endDate: {type: Date, 'default': Date.now},
      price: {type: String, 'default': "Free"},
      spaces: {type: Number, 'default': 1},
      vibe: {type: String},
      squatters: [
        {type: String}
      ],
      tags: [
        {type: String}
      ],
      images: []
    } );

    schema.statics.getPopularAmmenities = getPopularAmmenities;
    schema.statics.getPopularTags = getPopularTags;
    schema.statics.getPopularVibes = getPopularVibes;

    model = app.mongoose.model( name, schema );
  }

  function getPopularAmmenities(max, cb) {
      return this.distinct('amenities').limit(max).run(cb);
  }

  function getPopularVibes(max, cb) {
      return this.distinct('vibe').limit(max).run(cb);
  }

  function getPopularTags ( max, cb ) {
    return this.distinct( 'tags' ).limit( max ).run( cb );
  }

  return {
    getName: function () {
      return name;
    },
    getModel: function () {
      return model;
    },
    getSchema: function () {
      return schema;
    },
    initialize: initialize
  }
}());
