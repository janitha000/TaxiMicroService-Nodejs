"use strict";


const Product = require('../Data/Mongodb/Entities/product.model');
const Category = require('../Data/Mongodb/Entities/category.model');
const logger = require('../Util/winston');
const mongoose = require('mongoose');

exports.get_products_with_filter = function (req, callback) {
    var category = req.query.category || false;
    var priceFilter = req.query.filter || false;

    if (priceFilter && category) {
        logger.info("Querying with price filter " + priceFilter)
        Product.find({ price: { $gt: priceFilter }, category: category }).limit(10).sort({ created: -1 })
            .exec(function (err, result) {
                if (err) {
                    logger.error("Error when getting products " + err);
                    callback(err)
                }
                callback(null, result)
            })
    }
}

exports.get_product_with_name = function (productName, callback) {
    Product.findOne({ name: productName }, function (err, result) {
        if (err) {
            logger.error("Error when getting one product " + err);
            callback(err);
        }
        console.log(result.CreatedDate);
        callback(null, result);
    })
}

exports.get_produts_for_category_name = function (categoryId, callback) {
    Product.find({ category: categoryId }, { name: true }, (err, result) => {
        if (err) {
            logger.error("Error when getting products on categories with name " + err);
            callback(err);
        }

        callback(null, result);
    })
}

exports.add_product = function (req, callback) {
    let product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    });

    let categoryName = req.body.categoryName;

    Category.findOne({ name: categoryName }).exec(function (err, category) {
        if (err) {
            logger.error("Error when getting category");
            callback(err);
        }
        else {
            logger.info("Category searched " + category._id);
            product.category = category._id;
            logger.info("Adding product for id " + product.id);
            product.save(function (err) {
                if (err) {
                    logger.error('Error when saving products ' + err)
                    callback(err)
                }

                callback(null, 'Product Created');
            })
        }
    })
}

exports.update_product = function (req, callback) {
    let id = req.params.id;
    let body = req.body;

    Product.findByIdAndUpdate(id, body, { new: true }, (err, result) => {
        if (err) {
            logger.error('Error when updating products ' + err)
            callback(err)
        }

        callback(null, result);
    })
}

exports.get_categories = function () {
    var promise = new Promise(function (resolve, reject) {
        Category.find((err, result) => {
            if (err) {
                logger.error("Error when getting categories");
                reject(err);
            }
            resolve(result);
        })
    })

    return promise;

}

exports.add_category = function (req) {
    let category = new Category({
        name: req.body.name
    });

    var promise = new Promise((resolve, reject) => {
        category.save((error) => {
            if (error) {
                logger.error(`Error when saving category ${error}`);
                reject(error);
            }
            resolve('Category created');
        })
    })

    return promise;
}

exports.update_category = function(id,req, callback){
    let body = req.body
    Category.findByIdAndUpdate(id, body, {new : true}, (err, result) => {
        if(err){
            logger.error(`Error when updating category ${id}`);
            callback(err)
        }

        callback(result);
    })
}