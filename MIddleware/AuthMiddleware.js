const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const logger = require('winston')

const poolData = {
    UserPoolId: "us-east-1_gf5MTchOu",
    ClientId: "10psr24c9geo1836d792nc79cg"
};

const pool_region = "us-east-1";

exports.Validate = function (req, res, next) {
    var token = req.headers['authorization'];
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for (var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            //validate the token
            var decodedJwt = jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                logger.info("Not a valid JWT token")
                res.status(401);
                return res.send("Invalid token");
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                res.status(401);
                return res.send("Invalid token");
            }

            jwt.verify(token, pem, function (err, payload) {
                if (err) {
                    console.log("Invalid Token.");
                    res.status(401);
                    return res.send("Invalid token");

                } else {
                    console.log("Valid Token.");
                    console.log(payload);
                    return next();
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
            return next(error);
        }

    });
}