app.get('/vibe/autocomplete.json', function(req, res, next) {
    var regEx = new RegExp(req.query.contains, "i");
    
	Vibe.find({name: regEx}).limit(req.query.limit).exec(function(err, vibe) {
	    if (err) next(new Error('DB Error'));
	    else {
	        res.contentType('application/json');
	        res.send(JSON.stringify(vibe));
	    }
	});
});