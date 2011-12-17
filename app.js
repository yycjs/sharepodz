
/**
 * Module dependencies.
 */

var express = require('express'),
  everyauth = require('everyauth'),
  expressValidator = require('express-validator'),
  config = require('./config'),
  util = require('util'),
  Promise = everyauth.Promise,
	sys = require('sys'),
	fs = require('fs');

require('./route-middleware');

everyauth.debug = true;

app = module.exports = express.createServer();
var port = process.argv.length == 3 ? process.argv[2] : 3000;

// Mongoose Dependencies
mongoose = require('mongoose');
mongooseAuth = require('mongoose-auth');
mongoose.connect(config.connection);
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

require('./models/users.js');
require('./models/listing.js');
require('./models/vibe.js');
require('./models/amenity.js');

User = mongoose.model('User');
Listing = mongoose.model('Listing');
Vibe = mongoose.model('Vibe');
Amenity = mongoose.model('Amenity');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.dynamicHelpers({messages: require('express-messages')});
  //app.set("view options", { layout: false })
  app.register(".mustache", require('stache'));
  app.use(express.bodyParser({
      uploadDir: __dirname + '/public/images/uploaded',
      keepExtensions: true,
      type: 'multipart'
      }));
  app.use(expressValidator);
  app.use(express.cookieParser());
  app.use(express.session({secret: "98489fads3ewqrcs"}));
  app.use(express.methodOverride());
  app.use(mongooseAuth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.logger({format: 'dev'}));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.dynamicHelpers({
    loggedInUser: function(req, res) {
        return req.user;
    },
    flash: function(req, res) {
        return req.flash();
    }
});

// require all file in the /routes folder
fs.readdir( './routes', function( err, files ) {
	files.forEach(function(file) {
		if (file.match(/.js$/)) require( './routes/'+file );
	});

	mongooseAuth.helpExpress(app);

	app.listen(port);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

});
