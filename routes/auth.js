const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const router = express.Router();
const Joi = require("joi");
const {config} = require('../config')

router.post("/", async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is incorrect. ");

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword)
    return res.status(400).send("Email or Password is incorrect. ");

 const token = jwt.sign({_id: user._id}, config.jwtPrivateKey)

  res.send(token);
});

function ValidateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports = router;
