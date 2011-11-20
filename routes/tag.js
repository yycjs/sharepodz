app.post('/tag/create', function(req, res, next) {
    // try to find the tag
    var tagname = req.body.name;
    console.log("Finding tag:%s", tagname);
    Tag.findOne({name: tagname}, function(err, foundTag) {

        if (err) {
            console.log(err);
            throw err;
        } else if (!foundTag) {
            console.log("Creating tag: %s", tagname);
            var newTag = new Tag({name : tagname, count : 1});
            newTag.save(function(err, tag) {

                if (!err) {
                    console.log("Saved tag %s", tagname);
                    res.json({id:tag.id});
                } else {
                    console.log(err);
                    res.send(500);
                }
            });
        } else {
            console.log("Found tag: %s", tagname);
            console.log("Current tag count: %d", foundTag.count);
            foundTag.count++;
            console.log("New tag count: %d", foundTag.count);
            foundTag.save(function(err, tag) {

                if (!err) {
                    console.log("Saved tag %s", tagname);
                    res.json({id:tag.id});
                }
                else {
                    console.log(err);
                    res.send(500);
                }
            });
        }
    })
});

app.post('/tag/remove', function(req, res, next) {
    var tag_id = req.body.id;
    console.log("Finding tag id:%s", tag_id);
    Tag.findById(tag_id, function(err, foundTag) {

        if (err) {
            console.log(err);
            res.send(500);
        } else if (foundTag) {
            console.log("Found tag: %s", tag_id);
            console.log("Current tag count: %d", foundTag.count);
            foundTag.count--;
            console.log("New tag count: %d", foundTag.count);
            foundTag.save(function(err) {

                if (!err) {
                    console.log("Updated tag count %s", tag_id);
                    res.send(200);
                }
                else {
                    console.log(err);
                    res.send(500);
                }
            });
        }
    })
});