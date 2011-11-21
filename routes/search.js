app.get('/tags/search', function(req, res, next) {
    Listing.find({}, function(err, listings) {
        res.render('listing/results', {
            locals: {results: listings}
        });
    });
});