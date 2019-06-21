'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('./MIddleware/LoggerMiddleware');

var app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routes = require('./Routes/routes');

app.use(logger);

app.use('/', routes);

module.exports = app;