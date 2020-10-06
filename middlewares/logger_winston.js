'use strict';
let winston = require('winston');
let dateFormat = require('dateformat');
let options = {
    file: {
        level: 'debug',
        filename: `./logs/${process.env.APP_NAME}_${dateFormat(new Date(), "yyyy-mm-dd")}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // max 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        json: true,
        colorize: true,
        level: 'info',
        handleExceptions: true
        
    }
};

// call winston with setting
let logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.simple(),
        winston.format.printf(info => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`),
        winston.format.colorize()
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // exception
}); 

module.exports = logger;