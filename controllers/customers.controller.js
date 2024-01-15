const { Customer } = require("../models/customer");

const index = async (req, res) => {
  const customers = await Customer.find({}).sort("name");
  return res.send(customers);
};

const show = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  return res.send(customer);
};

const create = async (req, res) => {
  const { name, phone, isGold } = req.body;
  const customer = new Customer({
    name,
    phone,
    isGold,
  });
  await customer.save();
  return res.status(201).send(customer);
};

const update = async (req, res) => {
  const { name, phone, isGold } = req.body;
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name,
      phone,
      isGold,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  return res.send(customer);
};

const destroy = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  return res.send(customer);
};

module.exports = {
  show,
  index,
  create,
  update,
  destroy,
};
