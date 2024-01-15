const { ValidateMovie } = require("../models/movie");
const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../controllers/movies.controller.js");

// Routes

router.route("/").get(index);

router.route("/:id").get(validateObjectId, show);

router.route("/").post([auth, validate(ValidateMovie)], create);

router
  .route("/:id")
  .put([auth, validateObjectId, validate(ValidateMovie)], update);

router.route("/:id").delete([auth, admin, validateObjectId], destroy);

module.exports = router;
