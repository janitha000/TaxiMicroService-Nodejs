const priceHelper = require('../../Helpers/Taxi/PriceHelper');
const priceCalculator = require('../../Helpers/Taxi/Calculator/PriceCalculator')
const logger = require('winston')

exports.add_price = (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    priceHelper.add_price(name, price).then((result) => {
        res.send(result)
    }).catch((err) => {
        logger.error('Error when adding price ' + err);
        res.send(err);
    })
}

exports.get_prices = (req, res) => {
    priceHelper.get_prices(req.params.driverid, req.body.vehicleid, (err, result) => {
        if (err) {
            logger.error('Error when adding price ' + err);
            res.send(err);
        }

        res.send(result);
    })
}

exports.get_calculated_price = (req, res) => {
    const vehicleType = req.body.type;
    const distance = req.body.distance;

    
}

exports.get_detailed_details = (req, res) => {
    priceCalculator.get_detailed_driver().then((result) => {
        res.send(`${result[0]} ${result[1]}`);
    }).catch((err) => {
        logger.error(err);
        res.status(500).send(err);
    })
}