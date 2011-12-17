app.get('/amenity/autocomplete.json', function(req, res, next) {
    var regEx = new RegExp(req.query.contains, "i");
    
	Amenity.find({name: regEx}).limit(req.query.limit).exec(function(err, amenities) {
	    if (err) next(new Error('DB Error'));
	    else {
	        res.contentType('application/json');
	        res.send(JSON.stringify(amenities));
	    }
	});
});