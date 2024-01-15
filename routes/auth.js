const express = require("express");
const router = express.Router();
const login = require("../controllers/auth.controller.js");
const { ValidateLogin } = require('../models/user');
const validate = require("../middleware/validate");

router.route('/').post(validate(ValidateLogin),login)

module.exports = router;
