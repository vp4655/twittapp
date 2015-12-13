/**
 * Created by Valentino on 13.12.2015..
 */
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var path = require('path');
var Twit = require('twit');
var twitterConfig = require('../../config/config.js');

module.exports = function(app){
    app.use(favicon(path.join(app.get('views'), 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    var T = new Twit({
        consumer_key: twitterConfig.TWITTER_API_KEY,
        consumer_secret: twitterConfig.TWITTER_API_SECRET,
        access_token: twitterConfig.TWITTER_ACCESS_TOKEN,
        access_token_secret: twitterConfig.TWITTER_ACCESS_SECRET
    });

    app.set('twitter', T);
};