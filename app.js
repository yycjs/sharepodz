
/**
 * Module dependencies.
 */

var express   = require('express'),
    everyauth = require('everyauth'),
    util      = require('util'),
    Promise   = everyauth.Promise;

var app = module.exports = express.createServer();

// Configuration

everyauth.twitter
    .consumerKey('f65P8B74SD4tcqQhbCbTcA')
    .consumerSecret('kvkZWW4GfM51unOm6WDHDsdBkEnDQrNyDP5m80Swqoo')
    .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData) {
      var promise = new Promise();
      
      return promise;
    });

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  //app.set("view options", { layout: false })
  app.register(".mustache", require('stache'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "98489fads3ewqrcs"}));
  app.use(express.methodOverride());
  app.use(everyauth.middleware());
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

app.get('/', function (req, res) {
  res.render("index", {
   
    locals: {
      title: "Test"
    }
  });
});

// req.query.title

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
