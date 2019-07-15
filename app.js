'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const swaggerui = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const db = require('./Data/MySQL/config');

var cors = require('cors');
var logger = require('./MIddleware/LoggerMiddleware');
const mongoose = require('mongoose');
const mongodb = require('./Data/Mongodb/mongodb')

var app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodb.StartDbwithMongoose();
db.connect((err) => {
    if(err)
        console.log(err)
    console.log('Connected to MySQL database')
})

global.db = db;

app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));




var routes = require('./Routes/routes');
const taxiRoutes = require('./Routes/TaxiRoutes');
const marketRoutes = require('./Routes/marketRoutes')


app.use(logger);

app.use('/', routes);
app.use('/taxi/', taxiRoutes);
app.use('/market/', marketRoutes);

module.exports = app;



