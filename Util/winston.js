var winston = require('winston')
const CloudWatchTransport = require('winston-aws-cloudwatch')

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
        options: {
            flags: 'w'
        },
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    exception : {
        filename: 'logs/exception.log',
        options: {
            flags: 'w'
        },
    }
}

const CloudWatchOptions = {
    logGroupName: 'TaxiNodeServer',
    logStreamName: 'ServerStream',
    createLogStream: true,
    createLogStream: true,
    submissionInterval: 2000,
    submissionRetryCount: 1,
    batchSize: 20,
    awsConfig: {
        region: 'us-east-1'
      },
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
        new winston.transports.Console(loggerOptions.console),
        new CloudWatchTransport(CloudWatchOptions)

    ]
})

logger.exceptions.handle(
    new winston.transports.File(loggerOptions.exception)
)

//if (NODE_ENV == 'development') logger.add(cloudwatchTransport, CloudWatchOptions);


module.exports = logger;