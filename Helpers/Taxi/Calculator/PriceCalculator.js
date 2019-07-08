const logger = require('winston');
const axios = require('axios');

GetLatestExcahnge = async () => {
    try {
        const rates = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
        return rates;
    } catch (err) {
        logger.error(err);
    }
}

CalculatePrice = (total, conversionRate) => {
    return new Promise((resolve, reject) => {
        if (total && conversionRate) {
            const value = total * conversionRate;
            resolve(value);
        }
        else {
            reject('total or conversation rate is null');
        }
    })
}

exports.calculate_price = async (total, type) => {
    //const rates = await GetLatestExcahnge();
    return new Promise((resolve, reject) => {
        GetLatestExcahnge().then((result) => {
            if (result.data.rates.hasOwnProperty(type)) {
                const exchangeRate = result.data.rates[type];
                return CalculatePrice(total, exchangeRate);
            }
            else {
                reject('Specified rate is not available');
            }
        }).then((value) => {
            resolve(value);
        }).catch((err) => {
            reject(err)
        });
    })



    //return rates;
}