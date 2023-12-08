const { Rental, ValidateRental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rentals = await Rental.findById(req.params.id);
  if (!rentals)
    return res.status(404).send("The rental with the given id was not found");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = ValidateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    const session = await mongoose.startSession();
       session.withTransaction(async () => {
        const result = await rental.save();
        await Movie.updateOne(
              { _id: movie._id },
              { $inc: { numberInStock: -1 } },
            );
        res.send(result);
      });

      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      res.status(500).send("Something failed in session.");
    }
});

module.exports = router;
