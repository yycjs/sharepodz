var ListingSchema = new Schema({
	owner: ObjectId,
	name: {type: String},
	tagline: {type: String},
	description: {type: String},
	city: {type: String},
	province: {type: String},
	address1: {type: String},
	address2: {type: String},
	postalCode: {type: String},
	location: [],
	phone: {type: String},
	website: {type: String},
	twitter: {type: String},
	email: {type: String},
	created: {type: Date, default: Date.now},
	startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    price: {type: String, default: "Free"},
    spaces: {type: Number, default: 1},
	tags: [],
	images: []
});

ListingSchema.statics.getPopularTags = function getPopularTags(max, cb) {
    return this.distinct('tags').limit(max).run(cb);
}

mongoose.model('Listing', ListingSchema);

