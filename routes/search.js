var geocoder = require('geocoder');

app.get('/search', function(req, res, next) {
    res.render('listing/search', {
        layout: 'listing/search_layout',
        defaultLocation: 'Calgary, Alberta, Canada'
    });
});

app.get('/listings/results', getPopularAmmenities, function(req, res, next){
    res.render('listing/results', {
        locals: {
            results: req.listings,
            popularAmmenities: req.popularAmmenities,
            defaultLocation: req.loc
        }
    });
});

app.post('/listings/search', function(req, res, next) {

	console.log(req.body);
	console.log(req.body.location);

	var errors = [];
    req.onValidationError(function(msg) {
        errors.push(msg);
    });

    //Input Validation
    if (req.body.address)
    	req.assert('address', 'You need to provide a valid location').notNull();
    if (req.body.vibe)
    	req.assert('vibe', 'You need to provide valid vibe tags').notNull();
    if (req.body.amenities)
    	req.assert('amenities', 'You need to provide valid amenity tags').notNull();

    if (errors.length) {
        for (var i in errors) {
            req.flash('error', errors[i]);
        }
        res.redirect('back');
        return;
    }

    var criteria = {};

    if (req.body.vibe) {
    	criteria.vibe = { '$in': req.body.vibe };
    }

    if (req.body.amenities) {
    	criteria.amenities = { '$in': req.body.amenities };
    }

    if (req.body.address) {
		geocoder.geocode(req.body.address, function(err, data) {
			if (err) return next(err);
			if (!data) return next(new Error('Geocode Failed'));
			console.log(data);
	        var loc = data.results[0].geometry.location;
	        criteria.location = { $near: [loc.lng,loc.lat] };

	        console.log('Criteria :')
			console.log(criteria);
	        
	        Listing.find(criteria, function(err, results) {
		        if (err) next(err);
		        else {
		        	req.listings = results;
		        	req.loc = loc;
		        	res.redirect('/listings/results');
		        }
		    });
		});
    }
    else {
        Listing.find(criteria, function(err, results) {
	        if (err) next(err);
	        else {
	            req.listings = results;
		        res.redirect('/listings/results');
		    }
	    });
    } 
});