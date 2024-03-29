const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Rental } = require("../models/rental");
const mongoose = require("mongoose");

const index = async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  return res.send(rentals);
};

const create = async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie out of stock!");

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
        { $inc: { numberInStock: -1 } }
      );
      res.send(result);
    });

    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    res.status(500).send("Something failed in session.");
  }
};

const show = async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  return res.send(rental);
};

module.exports = {
  show,
  index,
  create,
};
