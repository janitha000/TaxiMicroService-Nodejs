var redis = require('redis')
var logger = require('../../Util/winston')


class RedisCache {

    constructor() {
        this.redisClient = redis.createClient(6379, "taxirediscache.f3cdew.0001.use1.cache.amazonaws.com");
        this.redisClient.on('connect', function () {
            console.log('connected');
            logger.info("Connected to Redis cache");
        })
    }

    Set (key, value, callback) {
        this.redisClient.Set(key, value, function (err, result) {
            if (err) {
                logger.error(err);
                callback(err);
            }
            logger.info(result);
            callback(null, result);
        })
    }

    Get (key, callback) {
        logger.info("Getting cache value for key " + key);
        this.checkExsistence(key).then(function (result) {
            if (result) {
                logger.info("existence result from get " + result);
                this.redisClient.Get(key, function (err, cacheresult) {
                    if (err) {
                        logger.error(err)
                        callback(err)
                    }
                    else {
                        logger.info("Get result " + cacheresult);
                        callback(null, cacheresult);
                    }
                })
            }
            else {
                callback(null, null);
            }

        }), function (err) {
            logger.error(err);
            callback(err);
        }
    }

    checkExsistence (key) {
        logger.info("checking existencefor  cache value for key " + key);
        return new Promise(function (resolve, reject) {
            this.redisClient.exists(key, function (err, result) {
            logger.info("existence result " + result);

                if (err) {
                    logger.error(err)
                    reject(err)
                }
                else if (result === 1) {
                    logger.info("existence is 1 " + result);
                    resolve(true)
                }
                else {
                    logger.info("existence result is " + result);
                    resolve(false);
                }
            })
        })
    }
}

module.exports = new RedisCache;

