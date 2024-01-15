const { ValidateRental } = require("../models/rental");
const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { index, show, create } = require("../controllers/rentals.controller.js");

router.route("/").get(index);

router.route("/:id").get([auth, validateObjectId], show);

router.route("/").post([auth, validate(ValidateRental)], create);

module.exports = router;
