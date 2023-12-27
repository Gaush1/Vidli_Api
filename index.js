const express = require("express");
const morgan = require('morgan');
require("express-async-errors");
const { config } = require("./config");
const winston = require('winston');
const logger = require('./startup/logging');
const app = express();

if (app.get('env') === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

  logger.stream = {
    write(message) {
      logger.info(message);
    },
  };

  app.use(morgan('tiny', { stream: logger.stream }));
  logger.info('Morgan enabled...');
}

require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation')();


app.listen(config.port, () =>
  logger.info(`Listening on http://localhost:${config.port}`)
);
