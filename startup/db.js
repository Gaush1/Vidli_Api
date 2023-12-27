const mongoose = require('mongoose');
const { config } = require('../config/index');
const logger = require('./logging');

module.exports = () =>{
    const db = config.db
    mongoose
    .connect(db)
    .then(() => logger.info(`Connected to MongoDB ${db}`))
    // .catch((err) => console.log("Could not connect to MongoDB...", err));
}
