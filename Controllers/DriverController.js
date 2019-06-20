var Driver = require('../Models/Driver');
var driverService = require('../Services/DriverService');

exports.driver_list = function (req, res) {
    let data = driverService.GetDriverList(function (err, data) {
        if (err)
            res.send(err);

        res.send(data);
    });
}

exports.single_driver = function (req, res) {
    let data = driverService.GetSingleDriver(req.params.driverId, function (err, data) {
        if (err)
            res.send(err);

        res.send(data);
    })
}

exports.add_driver = function (req, res) {
    let data = driverService.AddDriver(req.body, function (err, data) {
        if (err)
            res.send(err);
        res.send(data);
    })
}