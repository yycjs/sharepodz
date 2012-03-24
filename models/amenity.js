var amenitySchema = new Schema({
    name: {type: String, lowercase: true, trim: true},
    count: {type: Number, default: 1}
});

mongoose.model('Amenity', amenitySchema);
