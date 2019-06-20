var sql = require('mssql');

var config = {
    user: 'janitha',
    password: 'janitha54',
    server: 'taximicroservice.czxvbtppwr8q.us-east-1.rds.amazonaws.com', 
    database: 'taximicroservice'
}

exports.GetDriverList = function(callback){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query('SELECT * FROM Drivers')
    }).then(result => {
        let rows = result.recordset;
        sql.close();
        callback(null, rows);
    }).catch(err => {
        callback(err);
        sql.close();
    })
}

exports.GetSingleDriver = function(id, callback){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query('SELECT * FROM Drivers WHERE Id =' + id)
    }).then(result => {
        let rows = result.recordset;
        sql.close();
        callback(rows);
    }).catch(err => {
        callback(err);
        sql.close();
    })
}

exports.AddDriver = function(body, callback){
    var id = body.id;
    var firstName = body.firstName;
    var lastName = body.lastName;
    var nic = body.nic;
    var age = body.age;
    var vehiceId = body.vehiceId;

    new sql.ConnectionPool(config).connect().then(pool => {
        var queryUrl = "INSERT INTO Drivers (FristName, LastName, NIC, AGE) VALUES('" + firstName + '","' + lastName + '","' +  nic + '","' + age + '")"';
        return pool.request().query(queryUrl)
    }).then(result => {
        let rows = result.recordset;
        sql.close();
        callback(rows);
    }).catch(err => {
        callback(err);
        sql.close();
    })
}
