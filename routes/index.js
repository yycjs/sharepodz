app.get('/', function (req, res) {
	Listing.find({}, {}, {limit : 7}, function(err, listings) {
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