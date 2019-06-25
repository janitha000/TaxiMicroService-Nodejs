var redis = require('../Data/Cache/redis')

exports.GetCache = function(req, res){
    var key = req.params.key
    redis.GetValue(key, function(err, result){
        if(err)
            res.send(err)
        res.send(result);
    })
}

exports.setCache = function(req, res){
    var key = req.params.key;
    var body = req.body;

    redis.Set(key, body, function(err, result){
        if(err)
            res.send(err)

        res.send(result);
    })
}