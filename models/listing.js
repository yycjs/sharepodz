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
	location: {type: Array, index: "2d"},
	phone: {type: String},
	website: {type: String},
	twitter: {type: String},
	email: {type: String},
	created: {type: Date, default: Date.now},
	startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    price: {type: String, default: "Free"},
    spaces: {type: Number, default: 1},
    vibe: {type: String},
    squatters: [{type: String}],
	vibe: [{type: String}],
	amenities: [{type: String}],
	images: []
});

ListingSchema.statics.getPopularAmmenities = function getPopularAmmenities(max, cb) {
    return this.distinct('amenities').limit(max).run(cb);
}

ListingSchema.statics.getPopularVibes = function getPopularVibes(max, cb) {
    return this.distinct('vibe').limit(max).run(cb);
}

mongoose.model('Listing', ListingSchema);

