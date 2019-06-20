var sql = require('mssql');

var config = {
    user: 'janitha',
    password: 'janitha54',
    server: 'taximicroservice.czxvbtppwr8q.us-east-1.rds.amazonaws.com', 
    database: 'taximicroservice'
}

exports.GetVehicles = function(callback){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query('SELECT * FROM Vehicles')
    }).then(result => {
        let rows = result.recordset;
        sql.close();
        callback(null, rows);
    }).catch(err => {
        callback(err);
        sql.close();
    })
}