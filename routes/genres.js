const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { Validategenres } = require("../models/genre");
const validateObjectId = require("../middleware/validateObjectId");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../controllers/genres.controller.js");

// Routes

router.route("/").get(index);

router.route("/:id").get(validateObjectId, show);

router.route("/").post([auth, validate(Validategenres)], create);

router
  .route("/:id")
  .put([auth, validateObjectId, validate(Validategenres)], update);

router.route("/:id").delete([auth, admin, validateObjectId], destroy);

module.exports = router;
