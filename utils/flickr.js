const NodeFlickr = require('flickrapi');

const options = {
    apiKey: '03d229f52ed82232c9fe5d3c91c5ee45',
    secret: 'e8c9452b697b6d91'
}



const flickr_auth = NodeFlickr.token_only(options);

module.exports = flickr_auth;
