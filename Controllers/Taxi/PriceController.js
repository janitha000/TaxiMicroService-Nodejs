const priceHelper = require('../../Helpers/Taxi/PriceHelper');
const logger = require('winston')

exports.add_price = (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    priceHelper.add_price(name, price).then((result)=> {
        res.send(result)
    }).catch((err)=> {
        logger.error('Error when adding price ' + err);
        res.send(err);
    })
}