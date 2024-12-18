exports.sendSuccess = function (res, data) {
    return res.status(200).send({
        success: true,
        data: data
    });
};

exports.sendCreated = function (res, data) {
    return res.status(201).send(data);
};

exports.sendBadRequest = function (res, message) {
    return res.status(400).send({
        success: false,
        message: message || "Bad Request response."
    });
};

exports.sendUnauthorized = function (res, message) {
    return res.status(401).send({
        success: false,
        message: message || "Unauthorized."
    });
};

exports.sendForbidden = function (res, message) {
    return res.status(403).send({
        success: false,
        message: message || "You do not have rights to access this resource."
    });
};

exports.sendNotFound = function (res, message) {
    return res.status(404).send({
        success: false,
        message: message || "Resource not found."
    });
};

exports.sendInternalServerError = function (err, req, res) {
    return res.status(500).send({
        success: false,
        message: message || "Internal Server Error."
    });
};

exports.sendFatalError = function (err, req, res) {
    return res.status(err.status || 500).send({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

exports.setHeadersForCORS = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
    next();
};