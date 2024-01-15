const {
  ValidateCustomer,
  validateCustomerUpdate,
} = require("../models/customer");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../controllers/customers.controller.js");

// Routes
router.route("/").get(auth, index);

router.route("/:id").get([auth, validateObjectId], show);

router.route("/").post([auth, validate(ValidateCustomer)], create);

router
  .route("/:id")
  .put([auth, validateObjectId, validate(validateCustomerUpdate)], update);

router.route("/:id").delete([auth,validateObjectId], destroy);

module.exports = router;
