var TagSchema = new Schema({
    owner: ObjectId,
    name: {type: String, lowercase: true, trim: true},
    count: {type: Number, min: 0}
});

mongoose.model('Tag', TagSchema);
