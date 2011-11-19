
/**
 * Module dependencies.
 */

var express = require('express'),
	formidable = require('formidable'),
	sys = require('sys');

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

app.post('/upload', function(req, res, next){
	// parse a file upload
	var form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.uploadDir = __dirname + '/public'
	form.parse(req, function(err, fields, files) {
		if (err) next(err);
		// res.writeHead(200, {'content-type': 'text/plain'});
		// res.write('received upload:\n\n');
		// res.end(sys.inspect({fields: fields, files: files}));
		var path = files.upload.path.split('/');
		res.redirect('/' + path[path.length-1]);
	});
});

app.get('/upload', function(req, res, next){
	res.render('upload');
})



// req.query.title

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
