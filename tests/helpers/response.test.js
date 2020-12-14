const chai      = require('chai')
    , expect    = chai.expect
    , { errorResponse, successResponse } = require('../../helpers/response')

describe("Response Helper Function test", () => {
    before(() => 
        sampleData = {
          data: "Hey, this is just a sample data"
        },
        errSample = new Error()
    )

    // Check success response with data
    it("Should throw Success Response when called", function () {
        var response = successResponse('Success get Data', sampleData);
        expect(response.success).to.be.true;
        expect(response.result).to.be.a('object');
    });

    // Check error response with data
    it("Should throw Error Response when called", function () {
        var response = errorResponse('There is something when wrong', errSample);
        expect(response.success).to.be.false;
        expect(response.result).to.be.an("error");
    });
})