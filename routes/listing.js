var formidable = require('formidable');

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

app.get('/listing/:id', function(req, res, next){
	var listing = Listing.find({_id: req.params.id});    

	//Can't find the things...... not sure why
	console.log('found listing with ' + listing.title);

	res.render('listing/show', {
		locals: JSON.stringify(listing)
	});

});
