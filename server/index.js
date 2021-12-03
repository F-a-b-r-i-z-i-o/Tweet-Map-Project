const bodyParser = require('body-parser');
var cors = require('cors');
// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

const JSON5 = require('json5')

//app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 8080, listen);

// This call back just tells us that the server has started
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server start at http://' + host + ':' + port);
}

// Create an Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// This route searches twitter
app.get('/tweets/:query', getTweets);

// Callback
function getTweets(req, res) {
    // Here's the string we are seraching for
    var query = req.params.query;

    // Execute a Twitter API call
    T.get('search/tweets', { q: 'ID-TWEETER-PROFILE', count: 10 }, gotData);

    // Callback
    function gotData(err, data) {
        // Get the tweets
        var tweets = data.statuses;
        // Spit it back out so that p5 can load it!
        res.send(tweets);
        console.log(data)
    };
}

// This is a route for posting a tweet
app.post('/tweet', postTweet);

function postTweet(req, res) {
    // What did we ask to tweet?
    var statement = req.query.status;
    console.log(req.body.tweet);
    var tw = JSON5.stringify(req.body.tweet);


    // Post that tweet!
    T.post('statuses/update', { status: tw, tweeted });

    function tweeted(err, reply) {
        // If there was an error let's respond with that error
        if (err) {
            res.send(err);
            // Otherwise let's respond back that it worked ok!
        } else {
            res.send(reply);
        }
    };
}
