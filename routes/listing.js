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
    req.assert('name', 'You gotta name your space!').notNull();
    req.assert('about', 'You should provide a little search description').notNull();
    req.assert('description', 'You need to provide a listing description').notNull();
    req.assert('city', 'You need to provide a city').notNull();
    req.assert('province', 'You need to provide a province').notNull();
    req.assert('address1', 'You need to provide an address').notNull();
    req.assert('postalCode', 'You need to provide an postal code').is(/^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/);
    req.assert('phone', 'You need to provide a phone number').is(/^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    
    if (req.body.website != '')
        req.assert('website', 'If your going to provide a website you need to provide a valid one').isUrl();
        
    if (req.body.twitter != '')
        req.assert('twitter', 'If your going to provide a twitter handle you need to provide a valid one').is(/^@/);
        
    req.assert('email', 'You need to provide an email').isEmail();
    req.assert('startDate', 'You can\'t have a start date before today').isAfter();
    req.assert('endDate', 'You can\'t have an end date before today').isAfter();
    
    if (errors.length) {
        res.send('There were problems: ' + errors.join(', '), 500);
        return;
    }

    var tag_ids = req.body.tags;
    req.body.tags = Tag.find({_id:{$in: tag_ids}}, function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
    });

    var listing = new Listing();
    var lat, lng, geocode_addr;
    
    listing.owner = req.user.id;
    listing.name = req.body.name;
    listing.tagline = req.body.tagline;
    listing.description = req.body.description;
    listing.city = req.body.city;
    listing.province = req.body.province;
    listing.address1 = req.body.address1;
    listing.address2 = req.body.address2;
    listing.postalCode = req.body.postalCode.replace(/([A-Z]\d[A-Z]) (\d[A-Z]\d)$/, "$1 $2");
    listing.phone = req.body.phone.replace(/^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "1$1$2$3");
    listing.website = req.body.website;
    listing.twitter = req.body.twitter;
    listing.email = req.body.email.toLowerCase();
    listing.startDate = req.body.startDate;
    listing.endDate = req.body.endDate;
    listing.tags = req.body.tags;
    listing.images = [];
    listing.price = req.body.price;
    
    geocode_addr = listing.address1 + ", " + listing.address2 + ", " + listing.city + ", " + listing.province;
    geocoder.geocode(geocode_addr, function ( err, data ) {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
        
        listing.location = [lng, lat];

        listing.save(function(err, doc){
            if (err) next(new Error('DB Error: Cannot Save Listing'));
            else {
                var now = new Date();
                console.log(now + ' - Created listing ' + doc.id);
                res.redirect('/listing/' + doc.id);
            };
        });
    });
});

app.get('/listing/search*', function(req, res, next) {
    res.render('listing/search', { 
        layout: 'listing/search_layout',
        defaultLocation: 'Calgary, Alberta, Canada' 
    });
});

app.post('/listing/search', function(req, res, next) {
    geocoder.geocode(req.body.loc, function(err, data) {
        var loc = data.results[0].geometry.location;

        Listing.find({ location: { $near: [loc.lng,loc.lat]} }, function(err, localListings) {
            if (err)
                res.json({ error: err });
            else 
                res.json({ center:loc, listings:localListings });
        });
    });
});

app.get('/listing/results', getPopularTags, function(req, res, next) {
    Listing.find({}).limit(10).exec(function(err, listings) {
        for (var i = 0; i < listings.length; i++) {
            if (listings[i].images.length)
                listings[i].mainImage = listings[i].images[0];
            // else
            //     listings[i].mainImage = pathToPlaceHolder; //TODO: Add placeholder image
        }
        res.render('listing/results', {
            locals: {results: listings, popularTags: req.popularTags}
        });
    });
});

app.get('/listing/browse', getPopularTags, function(req, res, next) {
    Listing.find({}).limit(10).sort('created', -1).exec(function(err, listings) {
        for (var i = 0; i < listings.length; i++) {
            if (listings[i].images.length)
                listings[i].mainImage = listings[i].images[0];
            // else
            //     listings[i].mainImage = pathToPlaceHolder; //TODO: Add placeholder image
        }
        res.render('listing/browse', {
            locals: {results: listings, popularTags: req.popularTags}
        });
    });
});

app.get('/listing/:id', function(req, res, next){
    Listing.findById(req.params.id, function(err, listing) {
	    sys.inspect(listing, true);
        
        listing.lat = listing.location[1];
        listing.lng = listing.location[0];
        
	    res.render('listing/show', {
   	        locals: {listing: listing, popularTags: req.popularTags}
	    });
	});
});

