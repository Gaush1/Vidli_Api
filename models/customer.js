const mongoose = require('mongoose')
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    }
});

const Customer = mongoose.model("Customer", customerSchema);

function ValidateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
      })

    return schema.validate(customer)
}

function validateCustomerUpdate(customer) {
    const schema = Joi.object({
      isGold: Joi.boolean(),
      phone: Joi.string(),
      name: Joi.string().min(3).max(50),
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.ValidateCustomer = ValidateCustomer;
exports.validateCustomerUpdate = validateCustomerUpdate;
