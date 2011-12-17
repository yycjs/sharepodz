getPopularAmmenities = function (req, res, next) {
    Listing.getPopularAmmenities(5, function(err, amenities) {
        var popAmmenities = [];
        for (var i = 0; i < amenities.length; i++) {
            popAmmenities.push({amenity:amenities[i]});
        }

        req.popularAmmenities = popAmmenities;
        next();
    });
}

getPopularVibes = function (req, res, next) {
    Listing.getPopularVibes(5, function(err, vibes) {
        var popVibes = [];
        for (var i = 0; i < vibes.length; i++) {
            popVibes.push({vibe:vibes[i]});
        }

        req.popularVibes = popVibes;
        next();
    });
}

requireAuthorization = function (req, res, next) {
    if (!req.loggedIn) {
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/login');
    }
    else
        next();
}