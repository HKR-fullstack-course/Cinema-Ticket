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
  },
  movie_type: {
    type: String,
  },
  description: {
    type: String,
  },
  rate: {
    type: Number,
    enum: [-1, 0, 1, 2, 3, 4, 5],
    default: -1, // -1 if movie is not rated
  },
  budget: {
    type: Number,
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
  image_url: {
    type: String,
    default: `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1652046733/image/avatar/default.jpg`,
  },
  number_of_seats: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
