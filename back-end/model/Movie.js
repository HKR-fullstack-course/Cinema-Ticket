const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  release_date: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
  movie_type: {
    type: String,
    min: 7,
    max: 512,
  },
  description: {
    type: String,
    max: 1024,
  },
  rate: {
    type: Number,
    enum: [-1, 0, 1, 2, 3, 4, 5],
    default: -1, // -1 if movie is not rated
  },
  budget: {
    type: String,
  },
  main_actors: {
    type: Array,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
  show_long: {
    type: Number,
    require: true,
  },
  show_time: {
    type: String,
    require: true,
  },
  age_range: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
