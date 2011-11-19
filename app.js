
/**
 * Module dependencies.
 */

var express   = require('express'),
    everyauth = require('everyauth'),
    config = require('./config.js'),
    util      = require('util'),
    Promise   = everyauth.Promise;

everyauth.debug = true;

app = module.exports = express.createServer();

// Mongoose Dependencies
mongoose = require('mongoose');
mongooseAuth = require('mongoose-auth');
mongoose.connect(config.connection);
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

require('./models/users.js');

User = mongoose.model('User');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  //app.set("view options", { layout: false })
  app.register(".mustache", require('stache'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "98489fads3ewqrcs"}));
  app.use(express.methodOverride());
  app.use(mongooseAuth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
require('./controllers');
// req.query.title

mongooseAuth.helpExpress(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
