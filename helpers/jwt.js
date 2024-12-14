const jwtoken = require("jsonwebtoken");

// import helpers
const error = require('./error');



class JWT {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        this.algorithm = "HS256";
    }

    verify = (req, res, next) => {
        if (typeof req.headers.authorization != "undefined") {
            let token = req.headers.authorization.split(" ")[1];
            jwtoken.verify(token, this.secret, { algorithm: this.algorithm }, (err, user) => {
                if (err) {
                    return error.sendForbidden(res, "Not Authorized or invalid token.");
                } else {
                    req.body.auth = user;
                    return next();
                }
            });
        } else {
            return error.sendForbidden(res, "Not Authorized or invalid token.");
        }
    }

    verifyIgnoreExp = (req, res, next) => {
        if (typeof req.headers.authorization != "undefined") {
            let token = req.headers.authorization.split(" ")[1];
            jwtoken.verify(token, this.secret, { algorithm: this.algorithm, ignoreExpiration: true }, (err, user) => {
                if (err) {
                    return error.sendForbidden(res, "Not Authorized or invalid token.");
                } else {
                    req.body.auth = user;
                    return next();
                }
            });
        } else {
            return error.sendForbidden(res, "Not Authorized or invalid token.");
        }
    }

    nativeVerify = async (token) => {
        try {
            return await jwtoken.verify(token, this.secret);
        } catch (e) {
            return false;
        }
    }

    sign = async (payload, expiresIn) => {
        console.log(payload, "-----");
        return jwtoken.sign(payload, this.secret, { expiresIn: expiresIn || '1d' }, { algorithm: this.algorithm });
    }

    extractor = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }
}

let jwt = new JWT();
module.exports = {
    jwtNativeVerify: jwt.nativeVerify,
    jwtVerify: jwt.verify,
    jwtSign: jwt.sign,
    jwtExtractor: jwt.extractor,
    jwtVerifyIgnoreExp: jwt.verifyIgnoreExp,
};