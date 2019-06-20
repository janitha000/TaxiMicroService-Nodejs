var logger = require('../Util/winston')


function LogRequest(req, res, next){
    logger.info(req.url);
    return next();
}

module.exports = LogRequest;