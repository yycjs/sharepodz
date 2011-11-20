var formidable = require('formidable');
var sys = require('sys');
var geocoder = require('geocoder');

app.get('/listing/new', requireAuthorization, function(req, res, next){
    res.render('listing/new');
});

app.post('/listing/create', requireAuthorization, function(req, res, next){
    var errors = [];
    req.onValidationError(function(msg) {
        errors.push(msg);
    });
    
    //Input Validation
    req.assert(req.body.description, 'You need to provide a listing description').notEmpty();
    req.assert(req.body.city, 'You need to provide a city').notEmpty();
    req.assert(req.body.province, 'You need to provide a province').notEmpty();
    req.assert(req.body.address1, 'You need to provide an address').notEmpty();
    req.assert(req.body.postalCode, 'You need to provide an postal code').notEmpty(); //TODO: Validate postal code
    req.assert(req.body.phone, 'You need to provide an postal code').notEmpty(); //TODO: Validate phone
    
    if (req.body.website != '')
        req.assert(req.body.website, 'If your going to provide a website you need to provide a valid one').isUrl();
        
    if (req.body.twitter != '')
        req.assert(req.body.twitter, 'If your going to provide a twitter handle you need to provide a valid one').is(/^@/);
        
    req.assert(req.body.email, 'You need to provide an email').isEmail();
    req.assert(req.body.startDate, 'You can\'t have an start date before today').isAfter();
    req.assert(req.body.endDate, 'You can\'t have an end date before today').isAfter();
    
    if (errors.length) {
        res.send('There were problems: ' + errors.join(', '), 500);
        return;
    }

    var listing = new Listing();
    var lat, lng, geocode_addr;
    
    listing.owner = req.user.id;
    listing.title = req.body.title;
    listing.description = req.body.description;
    listing.city = req.body.city;
    listing.province = req.body.province;
    listing.address1 = req.body.address1;
    listing.address2 = req.body.address2;
    listing.postalCode = req.body.postalCode;
    listing.phone = req.body.phone;
    listing.website = req.body.website;
    listing.twitter = req.body.twitter;
    listing.email = req.body.email;
    listing.startDate = req.body.startDate;
    listing.endDate = req.body.endDate;
    listing.tags = req.body.tags.split();
    listing.images = [];
    
    geocode_addr = listing.address1 + ", " + listing.address2 + ", " + listing.city + ", " + listing.province;
    geocoder.geocode(geocode_addr, function ( err, data ) {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
    });
    listing.location = [lng, lat];

    listing.save(function(err, doc){
        if(err) next(new Error('DB Error: Cannot Save Listing'));
        else {
            var now = new Date();
            console.log(now + ' - Created listing' + doc);
            res.redirect('/listing/' + doc);
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

