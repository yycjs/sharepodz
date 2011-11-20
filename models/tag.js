var TagSchema = new Schema({
    owner: ObjectId,
    name: {type:String}
});

mongoose.model('Tag', TagSchema);
