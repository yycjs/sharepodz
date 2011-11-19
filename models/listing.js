exports.listing = new Schema({
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

mongoose.model('Listing', this.listing);