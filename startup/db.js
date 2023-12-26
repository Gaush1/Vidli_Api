const mongoose = require('mongoose');
const { config } = require('../config/index');

module.exports = () =>{
    const db = config.db
    mongoose
    .connect(db)
    .then(() => console.log(`Connected to MongoDB ${db}`))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
}
