
/**
 * Module dependencies.
 */

var express = require('express'),
	config = require('./config.js');

var app = module.exports = express.createServer();

// Mongoose Dependencies
mongoose = require('mongoose');
mongooseAuth = require('mongoose-auth');
mongoose.connect(config.connection);
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

require('./models/user.js');

User = mongoose.model('User');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
