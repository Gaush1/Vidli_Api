const express = require("express");
const router = express.Router();
const { Rental } = require("../models/rental");
const auth = require('../middleware/auth');
const Joi = require('joi');
const { Movie } = require("../models/movie");
const validate = require('../middleware/validate');

router.post("/",[auth, validate(ValidateReturn)], async (req, res) => {
  const { customerId, movieId } = req.body;
  const rental = await Rental.lookup(customerId,movieId);
  
  if (!rental) {
    res.status(404).send("movieId or customerId is not found");
  }

  if (rental.dateReturned) {
    res.status(400).send("Return already processed");
  }

  rental.return();
  await rental.save();

  await Movie.updateOne({
    _id: rental.movie._id
  },
  {
    $inc: {numberInStock: 1}
  });

  res.send(rental);
});

function ValidateReturn(returns){
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    })

  return schema.validate(returns)
};

module.exports = router;
