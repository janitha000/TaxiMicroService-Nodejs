var emailQueue = require('../SQSQueue/QueueService')
var logger = require('../Util/winston');
var redisCache = require('../Data/Cache/redis')

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');


global.fetch = require('node-fetch');


global.navigator = () => null;


const poolData = {
    UserPoolId: "us-east-1_gf5MTchOu",
    ClientId: "10psr24c9geo1836d792nc79cg"
};

const pool_region = "us-east-1";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = function (body, callback) {
    var name = body.name;
    var email = body.email;
    var password = body.password;

    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));

    userPool.signUp(name, password, attributeList, null, function (err, result) {
        if (err)
            callback(err);

        var cognitoUser = result.user;
        callback(cognitoUser);
    })
}

exports.Login = function (body, callback) {
    const userName = body.auth.username;
    const password = body.auth.password;

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: userName,
        Password: password
    });

    const userData = {
        Username: userName,
        Pool: userPool
    }

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            var accesstoken = result.getAccessToken().getJwtToken();
            logger.info("accesstoken " + accesstoken);
            if(accesstoken){
                callback(null, accesstoken)
            }
            else{
                callback(null, null)
            }


            // emailQueue.SendMessagetoSQS(userName).then(function (result) {
            //logger.info("Email sent");

            // redisCache.Set(username, accesstoken, (err, result) => {
            //     if (err) {
            //         logger.error("Error from cache " + err)
            //         callback(err)
            //     }
            //     logger.info("Result from cache " + result)
            //     logger.info("Added accesstoken to the cache for user ");
                 callback(null, accesstoken);

            // })
            //})
        },
        onFailure: (function (err) {
            callback(err);
        })
    })
};

exports.Validate = function (token, callback) {
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
                callback(new Error('Not a valid JWT token'));
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                callback(new Error('Invalid token'));
            }

            jwt.verify(token, pem, function (err, payload) {
                if (err) {
                    console.log("Invalid Token.");
                    callback(new Error('Invalid token'));

                } else {
                    console.log("Valid Token.");
                    console.log(payload);
                    callback("Valid token");
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
            callback(error);
        }

    });
}