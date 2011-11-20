var ListingSchema = new Schema({
	owner: ObjectId,
	description: {type: String},
	title: {type: String},
	location: [],
	city: {type: String},
	province: {type: String},
	address1: {type: String},
	address2: {type: String},
	postalCode: {type: String},
	phone: {type: String},
	website: {type: String},
	twitter: {type: String},
	email: {type: String},
	tags: [],
	images: []
});

ListingSchema.statics.getPopularTags = function getPopularTags(max, cb) {
    return this.distinct('tags').limit(max).run(cb);
}

mongoose.model('Listing', ListingSchema);
