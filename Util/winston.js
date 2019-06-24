var winston = require('winston')
var cloudwatchTransport = require('winston-aws-cloudwatch')

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const NODE_ENV = process.env.NODE_ENV || 'development'

const loggerOptions = {
    file: {
        level: 'info',
        filename: `logs/default.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        colorize: false,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
}

const CloudWatchOptions = {
    logGroupName: '',
    logStreamName: '',
    createLogStream: true,
    formatLog: function (item) {
        return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
    }
}

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});


var logger = new winston.createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.File(loggerOptions.file),
        new winston.transports.Console(loggerOptions.console)
    ]
})

//if (NODE_ENV == 'development') logger.add(cloudwatchTransport, CloudWatchOptions);


module.exports = logger;