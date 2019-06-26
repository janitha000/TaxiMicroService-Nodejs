const Product = require('../Data/Mongodb/Entities/product.model');
const Category = require('../Data/Mongodb/Entities/category.model')
const logger = require('../Util/winston')

const productHelper = require('../Helpers/ProductHelper');

exports.get_single_product = function (req, res) {
    var id = req.params.id;
    logger.info("Find product for id " + id);
    Product.findById(id, function (err, result) {
        if (err) {
            logger.error('Error when getting product ' + err);
            res.send(err);
        }

        res.send(result);
    })
}


exports.get_products = function (req, res) {
    productHelper.get_products_with_filter(req, function (err, result) {
        if (err) {
            logger.error("Error when getting products " + err);
            res.send(err);
        }
        res.send(result);
    })

}

exports.add_product = function (req, res) {
    let product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    });

    let categoryName = req.body.categoryName;

    Category.findOne({ name: categoryName }).exec(function (err, category) {
        if (err) {
            logger.error("Error when getting category");
            res.send("ERROR when getting category " + err);
        }
        else {
            logger.info("Category searched " + category._id);
            product.category = category._id;
            logger.info("Adding product for id " + product.id);
            product.save(function (err) {
                if (err) {
                    logger.error('Error when saving products ' + err)
                    res.send(err);
                }

                res.send('Product created');
            })
        }
    })
}