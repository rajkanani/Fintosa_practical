const { validationResult } = require("express-validator");
const error = require('./error');



exports.asyncHandler = (fn) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        error.sendBadRequest(res, err[0].message);
    } else {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
};