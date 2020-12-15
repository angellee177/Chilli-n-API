const chai      = require('chai')
    , chaiHttp  = require('chai-http')
    , expect    = chai.expect
    , server    = require('../../index')

chai.use(chaiHttp);
chai.should();

describe("Testing fetching External API and Search Images by Tags", () => {
    
    // Test Case 1, Get all Images Feed List from Flickr API
    describe('/GET public image list from Flickr public feed', () => {
        it("Should get all public image list from Flickr public feed", function (done) {
            chai.request(server)
            .get('/api/v1/feed/list')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal("Success Fetch Data");
                res.should.be.an("object");
                done();
            });
        });
    });

    // Test Case 2, Get all Images Feed List by Tags
    describe('/GET public image list based on Tags', () => {
        it("Should get all public image list based on Tags", function (done) {
            chai.request(server)
            .get('/api/v1/feed/search/goose/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal("Success Fetch Data");
                res.should.be.an("object");
                done();
            });
        });
    });
});