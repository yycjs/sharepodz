
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  //app.set("view options", { layout: false })
  app.register(".mustache", require('stache'));
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
