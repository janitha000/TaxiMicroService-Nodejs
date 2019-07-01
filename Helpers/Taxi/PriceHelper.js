const Price = require('../../Data/Mongodb/Entities/Taxi/price.model');
const logger = require('winston');

exports.add_price = (nameAdd, priceAdd) => {
    let price = new Price({
        name : nameAdd,
        price : priceAdd
    })
    return new Promise((resolve, reject) => {
        price.save((err)=> {
            if(err){
                logger.error("Error when adding price");
                reject(err);
            }

            resolve('Price Added');
        })
    })
}



