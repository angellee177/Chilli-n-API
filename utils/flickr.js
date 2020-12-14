const NodeFlickr = require('flickr-sdk');

const options = {
    apiKey: '03d229f52ed82232c9fe5d3c91c5ee45',
    secret: 'e8c9452b697b6d91'
}



const flickr_auth = NodeFlickr(options);

module.exports = flickr_auth;
