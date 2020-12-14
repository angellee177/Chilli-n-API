const { errorResponse, successResponse } = require('../helpers/response')
    , express       = require('express')
    , router        = express.Router()
    , request       = require('request')
    , moment        = require('moment')
    , feedList      = "https://api.flickr.com/services/feeds/photos_public.gne?format=json"


// Get Feed List
router.get('/feed/list', (req, res) => {
    console.log(searchByTags);
    try {
        request({
            url     : feedList,
            json    : true,
        }, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    // extract character from string
                    let mySubString = body.substring(
                        body.indexOf("[") - 1,
                        body.lastIndexOf("]") + 1
                    )

                    // convert string to object 
                    let data = JSON.parse(mySubString)

                    // create new output data || reform a new output
                    let allPhotos = data.map(photo => ({

                        Static_URL: photo.media.m.toString().replace("\\", ""),
                        Flickr_URL: photo.link.toString().replace("\\", ""),
                        Owner_URL: 'https://www.flickr.com/photos/' + photo.author_id,
                        Title: photo.title,
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
        return res.status(422).json(errorResponse("something went wrong when trying to fetch data", err));
    }
});   


// Get Images based on Images Tags
router.get('/feed/search/:tags', (req, res) => {
    try {
        const query = { tags: req.params.tags }
            , searchByTags  = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`
            +`api_key=b525f14a53fff62a96c3d7c392b13ad4&`
            +`tags=${query.tags}&format=json&nojsoncallback=1&api_sig=dad2e45f8cd6f4555c16e50cc1c60552`

        request({
            url : searchByTags,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.status(200).json(successResponse(`Success get photos list with tags ${query}`, body));
            } else {
                res.status(422).json(errorResponse(`Cannot find the photos with tags ${query}`, error));
            }
        });
        
    } catch (err) {
        return res.status(422).json(errorResponse("There is something went wrong, please try again!", err));
    }
});


module.exports = router;

