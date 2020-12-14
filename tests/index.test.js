const chai      = require('chai')
    , chaiHttp  = require('chai-http')
    , expect    = chai.expect
    , server    = require('../index')

chai.use(chaiHttp);
chai.should();

describe("Testing the Index file", () => {

    // Get index of the API
    describe('/GET the API to see if can connect to API or not', () => {
        it("Should show the landing pages of the API", function (done) {
            chai.request(server)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal("Welcome to Chilli'n API!! This is a simple API that consume External API from Flickr API.");
                res.should.be.an("object");
                done();
            });
        });
    });
});