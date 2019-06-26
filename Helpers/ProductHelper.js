const Product = require('../Data/Mongodb/Entities/product.model');
const logger = require('../Util/winston');

exports.get_products_with_filter = function (req, callback) {
    var category = req.query.category || false;
    var priceFilter = req.query.filter || false;

    if (priceFilter && category) {
        logger.info("Querying with price filter " + priceFilter)
        Product.find({ price: { $gt: priceFilter }, category : category }).limit(10).sort({ created: -1 })
            .exec(function (err, result) {
                if (err) {
                    logger.error("Error when getting products " + err);
                    callback(err)
                }
               callback(null, result)
            })
    }


}