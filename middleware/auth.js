const jwt = require('jsonwebtoken');
const {config} = require('../config')

// Authorisation middleware.
module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access denied. No token provided");

    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token.");
    }
}
