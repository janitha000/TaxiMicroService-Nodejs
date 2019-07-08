var redis = require('../Data/Cache/redis')
const httpHandler = require('../Handlers/HttpHandler');
const priceCalculator = require('../Helpers/Taxi/Calculator/PriceCalculator');

exports.GetCache = function (req, res) {
    var key = req.params.key
    redis.GetValue(key, function (err, result) {
        if (err)
            res.send(err)
        res.send(result);
    })
}

exports.setCache = function (req, res) {
    var key = req.params.key;
    var body = req.body;

    redis.Set(key, body, function (err, result) {
        if (err)
            res.send(err)

        res.send(result);
    })
}

exports.get_ticks = async (req, res) => {
    const data = await httpHandler.GET('https://printcloud.rambase.net/api/ticks');
    res.json(data);
}

exports.get_convreted_price = async (req, res) => {
    const total = req.query.price;
    const type = req.query.type;
    // try{
    //     const price = await priceCalculator.calculate_price();
    //     res.send(price.data.rates);
    // }
    // catch(err){
    //     res.send(err);
    // }
    

    priceCalculator.calculate_price(total, type).then((price) => {
        res.send(price.toString());
    }).catch((err) => {
        res.send(err);
    })
}