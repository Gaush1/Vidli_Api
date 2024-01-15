const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const Joi = require('joi');
const validate = require('../middleware/validate');
const {create} = require("../controllers/returns.controller.js");

router.route("/").post([auth, validate(ValidateReturn)],create);

function ValidateReturn(returns){
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    })

  return schema.validate(returns)
};

module.exports = router;
