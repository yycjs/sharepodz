app.get('/tag/autocomplete.json', function(req, res, next) {
    var regEx = new RegExp(req.query.contains, "i");
    
	Tag.find({name: regEx}).limit(req.query.limit).exec(function(err, tags) {
	    if (err) next(new Error('DB Error'));
	    else {
	        res.contentType('application/json');
	        res.send(JSON.stringify(tags));
	    }
	});
});