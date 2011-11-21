getPopularTags = function (req, res, next) {
    Listing.getPopularTags(5, function(err, tags) {
        var popTags = [];
        for (var i = 0; i < tags.length; i++) {
            popTags.push({tag:tags[i]});
        }

        req.popularTags = popTags;
        next();
    });
}

requireAuthorization = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/login');
        //next(new Error('You must be logged in to access this page'));
    }
    else
        next();
}