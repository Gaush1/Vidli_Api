const { Customer, ValidateCustomer } = require("../models/customer");
const express = require("express");
const router = express.Router();
const auth =  require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

// Routes
router.get("/", auth, async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

router.get("/:id",[auth,validateObjectId], async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("The Customer with the given id was not found");
  res.send(customer);
});

router.post("/",auth, async (req, res) => {
  const { error } = ValidateCustomer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id",[auth,validateObjectId], async (req, res) => {
  const { error } = ValidateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The Customer with the given id was not found");

  res.send(customer);
});

router.delete("/:id",validateObjectId,async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send("The Customer with the given id was not found");

  res.send(customer);
});

module.exports = router;
