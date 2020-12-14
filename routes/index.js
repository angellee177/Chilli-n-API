const { errorResponse, successResponse } = require('../helpers/response')
    , express    = require('express')
    , router     = express.Router()
    , flickr     = require('../utils/flickr.js')
    , url        = "https://api.flickr.com/services/feeds/photos_public.gne?format=json"

router.get('/feed/list', async function getFeedList (req, res) {
    try {
        req({
            url: url,
            json: true
        }, function (err, res, body) {
            if(!err && res.statusCode === 200) {

                let mySubString = body.substring(
                    body.indexOf("[") - 1,
                    body.lastIndexOf("]") + 1
                );

                let data        = JSON.parse(mySubString)
                allPhotos   = data.map(photo => ({
                        photoStaticURL: photo.media.m.toString().replace("\\", ""),
                        PhotoFlickrURL: photo.link.toString().replace("\\", ""),
                        photoOwnerURL: 'https://www.flickr.com/photos/' + photo.author_id,
                        photoTitle: photo.title,
                        photoPublushed: moment(photo.published).format('MM MMMM YYYY'),
                        photoOwner: photo.author.substring(
                            photo.author.indexOf("\"") + 1,
                            photo.author.lastIndexOf("\"") - 1
                        ),
                        photoTags: photo.tags
                    }) 
                );
                res.render('home', {
                    title: 'Home',
                    photos: allPhotos
                })
            }
        });

    } catch (err) {
        return res.status(422).json(errorResponse("something went wrong when trying to fetch data", err));
    }
});    


module.exports = router;

