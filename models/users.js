var UserShema = new Schema({
    email: {type: String},
    phoneNumber : {type: String} 
});

var conf = require('../conf');

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
            myHostname: 'http://localhost:3000'
            , appId: conf.fb.appId
            , appSecret: conf.fb.appSecret
            , redirectPath: '/'
        }
    }
    , twitter: {
        everyauth: {
            myHostname: 'http://localhost:3000'
            , consumerKey: conf.twit.consumerKey
            , consumerSecret: conf.twit.consumerSecret
            , redirectPath: '/'
        }
    }
    , github: {
        everyauth: {
            myHostname: 'http://localhost:3000'
            , appId: conf.github.appId
            , appSecret: conf.github.appSecret
            , redirectPath: '/'
        }
    }
});