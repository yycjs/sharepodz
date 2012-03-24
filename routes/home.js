app.get('/', function (req, res) {
	Listing.find({}).limit(7).sort('created', -1).exec(function(err, listings) {
	    
	    for (var i in listings) {
	        listings[i].mainImage = listings[i].images[0];
	    }
		var latest = listings.pop();
		res.render('index', {
			locals: {
				title: "Test",
				is_home: true,
				results: listings,
				latest : latest
			}
		});
	});
});