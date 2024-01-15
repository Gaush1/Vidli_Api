const express = require("express");
const { ValidateUser } = require("../models/user");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate.js");
const { show, create } = require("../controllers/users.controller.js");

// Route to get the corrent user.
router.route("/me").get(auth, show);

router.route("/").post(validate(ValidateUser), create);

module.exports = router;
