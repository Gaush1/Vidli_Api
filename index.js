const express = require("express");
require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { config } = require("./config");
const winston = require('winston');
const logger = require('./startup/logging');
const app = express();
const genre = require("./routes/genres");
const customer = require("./routes/customers");
const movie = require("./routes/movies");
const rental = require("./routes/rentals");
const user = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

require('./startup/config')();
require('./startup/db')();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hellow World");
});

app.use("/api/genres", genre);

app.use("/api/customers", customer);

app.use("/api/movies", movie);

app.use("/api/rentals", rental);

app.use("/api/users", user);

app.use("/api/auths", auth);

app.use(error);

app.listen(config.port, () =>
  console.log(`Listening on http://localhost:${config.port}`)
);
