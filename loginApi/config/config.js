const winston = require('winston');

const port = 4001;
const Logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/allLog.log',
    }),
  ],
});

module.exports = {
  Logger,
  port,
};
