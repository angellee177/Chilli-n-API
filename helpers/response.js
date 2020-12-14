exports.successResponse = (message, data) => {
    return ({
        success: true,
        message: message,
        result : data
    });
}

exports.errorResponse = (message, err) => {
    return ({
        success: false,
        message: message,
        result : err
    })
}