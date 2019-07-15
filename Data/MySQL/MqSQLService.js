const logger = require('../../Util/winston')

exports.get_all_customers = (callback) => {
    let query = "SELECT * FROM elektrodb.customer"

    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            callback(err)
        }

        callback(null, result)
    })
}

exports.add_customer = (customer)  => {
    const name = customer.name;
    const currency = customer.currency;
    const createdOn = GetCurrentDateTimeStamp();
    const email = customer.email;


    let query = "INSERT INTO elektrodb.customer (Name, CreatedOn, Currency, email) VALUES ('"+ name + "', '" + createdOn + "','" + currency +"','" + email + "')"
    
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if(err){
                console.log(err);
                logger.error(err);
                reject(err)
            }
            else{
                let query = "SELECT * FROM elektrodb.customer WHERE Name = '" + name + "'";
                db.query(query, (err, res) => {
                    if(err)
                        reject(err)
                    resolve(res);    
                })
            }
        })

    })

}

exports.update_customer = (customerId, customer) => {
    
}

exports.delete_customer = (customerId) => {
    let query = "DELETE FROM elektrodb.customer WHERE CustomerId =" + customerId;

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if(err){
                logger.error(err);
                reject(err);
            }
            else{
                resolve('Cutomer deleted');
            }
        })
    })
}


GetCurrentDateTimeStamp = () => {
    const DateNow = new Date();
    const year = DateNow.getFullYear();
    const month = DateNow.getMonth();
    const date = DateNow.getDate();

    const hour = DateNow.getHours();
    const minute = DateNow.getMinutes();
    const seconds = DateNow.getSeconds();

    const FormattedDate = `${year}-${month}-${date} ${hour}:${minute}:${seconds}`;
    return FormattedDate;
}