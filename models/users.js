var UserSchema = new Schema({
    email: {type: String},
    phoneNumber : {type: String} 
});

var conf = require('../config');

UserSchema.plugin(mongooseAuth, {
    // Here, we attach your User model to every module
    everymodule: {
        everyauth: {
            User: function () {
                return User;
            }
        }
    }
    , facebook: {
        everyauth: {
            myHostname: conf.hostname
            , appId: conf.fb.appId
            , appSecret: conf.fb.appSecret
            , redirectPath: '/'
        }
    }
    , twitter: {
        everyauth: {
            myHostname: conf.hostname
            , consumerKey: conf.twit.consumerKey
            , consumerSecret: conf.twit.consumerSecret
            , redirectPath: '/'
        }
    }
    , github: {
        everyauth: {
            myHostname: conf.hostname
            , appId: conf.github.appId
            , appSecret: conf.github.appSecret
            , redirectPath: '/'
        }
    }
});

mongoose.model('User', UserSchema);
