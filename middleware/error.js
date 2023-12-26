const logger = require("../startup/logging");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  // Log Error message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Something went wrong';

  res.status(err.statusCode).send(err.status);
};
