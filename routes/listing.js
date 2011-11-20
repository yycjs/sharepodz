var formidable = require('formidable');
var sys = require('sys');

app.get('/listing/new', requireAuthorization, function(req, res, next){
    res.render('listing/new');
});

app.post('/listing/create', requireAuthorization, function(req, res, next){
    var errors = [];
    req.onValidationError(function(msg) {
        errors.push(msg);
    });
    
    
    
    //Input Validation
    req.assert('name', 'You gotta name your space!').notNull();
    req.assert('tagline', 'You should provide a little search description').notNull();
    req.assert('description', 'You need to provide a listing description').notNull();
    req.assert('city', 'You need to provide a city').notNull();
    req.assert('province', 'You need to provide a province').notNull();
    req.assert('address1', 'You need to provide an address').notNull();
    req.assert('postalCode', 'You need to provide an postal code').notNull(); //TODO: Validate postal code
    req.assert('phone', 'You need to provide an postal code').notNull(); //TODO: Validate phone
    
    if (req.body.website != '')
        req.assert('website', 'If your going to provide a website you need to provide a valid one').isUrl();
        
    if (req.body.twitter != '')
        req.assert('twitter', 'If your going to provide a twitter handle you need to provide a valid one').is(/^@/);
        
    req.assert('email', 'You need to provide an email').isEmail();
    req.assert('startDate', 'You can\'t have an start date before today').isAfter();
    req.assert('endDate', 'You can\'t have an end date before today').isAfter();
    
    if (errors.length) {
        res.send('There were problems: ' + errors.join(', '), 500);
        return;
    }

    var listing = new Listing();

    listing.owner = req.user.id;
    listing.name = req.body.name;
    listing.about = req.body.about;
    listing.description = req.body.description;
    listing.city = req.body.city;
    listing.province = req.body.province;
    listing.address1 = req.body.address1;
    listing.address2 = req.body.address2;
    listing.postalCode = req.body.postalCode;
    listing.location = [null, null]; //TODO: Get location from google geocoding response and store it as [lng, lat]
    listing.phone = req.body.phone;
    listing.website = req.body.website;
    listing.twitter = req.body.twitter;
    listing.email = req.body.email;
    listing.startDate = req.body.startDate;
    listing.endDate = req.body.endDate;
    listing.tags = req.body.tags;
    listing.images = [];

    listing.save(function(err, doc){
        if(err) next(new Error('DB Error: Cannot Save Listing'));
        else {
            var now = new Date();
            console.log(now + ' - Created listing' + doc.id);
            res.redirect('/listing/' + doc.id);
        };
    });
});

app.get('/listing/search*', function(req, res, next) {
    res.render('listing/search', { layout: 'listing/search_layout'});
});

app.get('/listing/results', getPopularTags, function(req, res, next) {
    Listing.find({}, function(err, listings) {
        for (var i = 0; i < listings.length; i++) {
            listings[i].mainImage = listings[i].images[0];
        }
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

