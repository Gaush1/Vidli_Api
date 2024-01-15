const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");

const create = async (req, res) => {
  const { customerId, movieId } = req.body;
  const rental = await Rental.lookup(customerId, movieId);

  if (!rental) {
    res.status(404).send("movieId or customerId is not found");
  }

  if (rental.dateReturned) {
    res.status(400).send("Return already processed");
  }

  rental.return();

  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.send(rental);
};

module.exports = { create };
