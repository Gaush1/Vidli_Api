const mongoose = require('mongoose');
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model("Genre", genreSchema);

function Validategenres(genre){
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
      })

    return schema.validate(genre)
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.Validategenres = Validategenres;