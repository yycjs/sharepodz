var formidable = require('formidable');
var sys = require('sys');

app.get('/listing/new', function(req, res, next){
	res.render('listing/new');
});

app.post('/listing/create', function(req, res, next){
	var listing = new Listing(req.body);

	listing.save(function(err, user_Saved){
		if(err){
			throw err;
			console.log(err);
		}else{
			console.log('saved!');
			res.redirect('/listing/'+listing.id);
		};
	});
});

app.get('/listing/search&random=:id', function(req, res, next) {
    res.render('listing/search', { layout: 'listing/search_layout'});
});

app.get('/listing/results', function(req, res, next) {
    Listing.find({}, function(err, listings) {
        res.render('listing/results', {
            locals: {results: listings}
        });
    });
});

app.get('/listing/:id', function(req, res, next){
	Listing.findById(req.params.id, function(err, listing) {

		sys.inspect(listing, true);

		res.render('listing/show', {
			locals: {listing: listing}
		});

	});    

});

