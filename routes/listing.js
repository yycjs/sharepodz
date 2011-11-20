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

function getPopularTags(req, res, next) {
    Listing.getPopularTags(5, function(err, tags) {
        var popTags = [];
        for (var i = 0; i < tags.length; i++) {
            popTags.push({tag:tags[i]});
        }

        req.popularTags = popTags;
        next();
    });
}

app.get('/listing/search*', function(req, res, next) {
    res.render('listing/search', { layout: 'listing/search_layout'});
});

app.get('/listing/results', getPopularTags, function(req, res, next) {
    Listing.find({}, function(err, listings) {
        console.log(listings);
        res.render('listing/results', {
            locals: {results: listings, popularTags: req.popularTags}
        });
    });
});

app.get('/listing/:id', function(req, res, next){
    Listing.findById(req.params.id, function(err, listing) {

	    sys.inspect(listing, true);

	    res.render('listing/show', {
   	        locals: {listing: listing, popularTags: req.popularTags}
	    });

	});
});

