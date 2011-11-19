
app.post('/upload', function(req, res, next){
	// parse a file upload
	var form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.uploadDir = __dirname + '/public/images'
	form.parse(req, function(err, fields, files) {
		if (err) next(err);
		// res.writeHead(200, {'content-type': 'text/plain'});
		// res.write('received upload:\n\n');
		// res.end(sys.inspect({fields: fields, files: files}));
		var path = files.upload.path.split('/');
		res.redirect('/images/' + path[path.length-1]);
	});
});

app.get('/upload', function(req, res, next){
	res.render('upload');
})