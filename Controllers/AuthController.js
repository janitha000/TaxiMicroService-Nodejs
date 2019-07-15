var authService = require('../Services/AuthService');

exports.register = function (req, res) {
    let register = authService.Register(req.body, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.send(result);
    })
}

exports.login = function (req, res) {
    let login = authService.Login(req.body, function (err, result) {
        if (err) {
            console.log(err);
            res.send({"loggedin" : false, "Message" : err.message})

        }

        else {
            if (result) {
                res.send({ "loggedin": true, "accesstoken": result })
            }
            else {
                res.send({ "loggedin": false });

            }

        }
    })
}

exports.validate_token = function (req, res) {
    let validate = authService.Validate(req.body.token, function (err, result) {
        if (err)
            res.send(err.message);

        res.send(result);
    })
}