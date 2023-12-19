const path = require('path');
const dotenv = require('dotenv');
const {DB_NAME} = require('../contants');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
    db: `${process.env.MONGODB_URL}/${DB_NAME}`,
    port: process.env.PORT || 3000,
    jwtPrivateKey: process.env.VIDLY_JWTPRIVATEKEY,
}

module.exports = { config };