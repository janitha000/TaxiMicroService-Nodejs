const mqsqlService = require('../Data/MySQL/MqSQLService')

exports.get_all_customers = (req, res) => {
    let customers = mqsqlService.get_all_customers((err, result) => {
        if(err)
            res.send(err)

        res.send(result);
    })
}

exports.add_customer = (req, res) => {
    let createdCustomer = mqsqlService.add_customer(req.body).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.delete_customer = async (req, res)=> {
    try{
        const result = await mqsqlService.delete_customer(req.params.customerId);
        res.send(result)
    }
    catch(err){
        res.status(500).send(err);
    }
}