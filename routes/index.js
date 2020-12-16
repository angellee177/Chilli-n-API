const { errorResponse, successResponse } = require('../helpers/response')
    , express       = require('express')
    , router        = express.Router()
    , request       = require('request')
    , moment        = require('moment')
    , feedList      = "https://api.flickr.com/services/feeds/photos_public.gne?format=json"


// Get Feed List
router.get('/feed/list', (req, res) => {
    try {

        request({
            url     : feedList,
            json    : true,
        }, function(error, response, body) {
            console.log(response.statusCode);
                if (!error && response.statusCode === 200) {
                    // extract character from string
                    let mySubString = body.substring(
                        body.indexOf("[") - 1,
                        body.lastIndexOf("]") + 1
                    )

                    // convert string to object 
                    let data = JSON.parse(mySubString)

                    // create new output data || reform a new output
                    let allPhotos = data.map((photo, i) => ({
                        id        : i+1,
                        Static_URL: photo.media.m.toString().replace("\\", ""),
                        Flickr_URL: photo.link.toString().replace("\\", ""),
                        Owner_URL : 'https://www.flickr.com/photos/' + photo.author_id,
                        Title     : photo.title,
                        Description: photo.description,
                        Published_date: moment(photo.published).format('MM MMMM YYYY'),
                        Author: photo.author.substring(
                            photo.author.indexOf("\"") + 1,
                            photo.author.lastIndexOf("\"") - 1
                        ),
                        Tags: photo.tags
                    }))

                    res.status(200).json(successResponse("Success Fetch Data", allPhotos));
                };
        });
    } catch (err) {
        /* istanbul ignore next */
        return res.status(422).json(errorResponse("something went wrong when trying to fetch data", err));
    }
});   


// Get Images based on Images Tags
router.get('/feed/search', (req, res) => {
    try {
        const query = { tags    : req.query.tags  }
            , searchByTags     = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`+
            `api_key=8ede54ad5bdb6c9993ed6b7904598b25&tags=${query.tags}&format=json&nojsoncallback=1`
        // URL FLICKR API with Auth, so can have full permission
            // , searchByTags  = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`+
            // `api_key=8ede54ad5bdb6c9993ed6b7904598b25&tags=${query.tags}`+
            // `&format=json&nojsoncallback=1&auth_token=72157717363204738-f9378b7fc2a2a7b4&api_sig=e696a943029ff846b1b643803264522a`

        request({
            url : searchByTags,
            json: true
        }, function (error, response, body) {
            
            if (!error && typeof(body.photos.photo) !== undefined ) {
                // create a new output Data and get the Photos detail
                let allPhotos = body.photos.photo.map((photo, i) => ({
                    id        : i+1,
                    Photo_id  : photo.id, 
                    Static_URL: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg',
                    Flickr_URL: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id,
                    Owner_URL : 'https://www.flickr.com/photos/' + photo.owner,
                    Title     : photo.title,
                    // Published_date: moment(photo.published).format('MM MMMM YYYY'),
                    Author    : photo.owner,
                    // Tags      : photo.tags
                }));

                res.status(200).json(successResponse("Success Fetch Data", allPhotos));

            } else {
                /* istanbul ignore next */
                res.status(422).json(errorResponse(`Cannot find the photos with tags ${query}`, error));
            }
        });
        
    } catch (err) {
        /* istanbul ignore next */
        return res.status(422).json(errorResponse("There is something went wrong, please try again!", err));
    }
});


module.exports = router;

