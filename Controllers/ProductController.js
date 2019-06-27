const Product = require('../Data/Mongodb/Entities/product.model');
const Category = require('../Data/Mongodb/Entities/category.model')
const logger = require('../Util/winston')

const productHelper = require('../Helpers/ProductHelper');

exports.get_single_product = function (req, res) {
    var name = req.params.name;
    logger.info("Find product for id " + name);
    productHelper.get_product_with_name(name, function(err, result){
        if (err) {
            logger.error("Error when getting products " + err);
            res.send(err);
        }
        res.send(result);
    })
}

exports.get_products_for_categoies_onlyname = function(req, res){
    productHelper.get_produts_for_category_name(req.params.category, function(err, result){
        if (err) {
            logger.error("Error when getting products with name " + err);
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
    logger.info("Adding product");
    productHelper.add_product(req, function(err, result){
        if (err) {
            logger.error("Error when adding products " + err);
            res.send(err);
        }
        res.send(result);
    })
}

exports.update_product = function(req, res){
    productHelper.update_product(req, (err, result) => {
        if (err) {
            logger.error("Error when updating products " + err);
            res.send(err);
        }
        res.send(result);
    })
}

exports.get_categories = function(req, res){
    productHelper.get_categories().then(function(result){
        res.send(result)
    }), function(error){
        logger.error("Error when getting categgories");
        res.send(error);
    }
}
