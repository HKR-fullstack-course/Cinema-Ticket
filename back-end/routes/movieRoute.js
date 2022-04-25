const express = require("express");
const router = express.Router();

const Movie = require("../model/Movie");
const { movieValidation } = require("../validation/movie");

router
  .post("/add_movie", async (req, res) => {
    if (req.body == null) {
      return res.status(400).json({
        error: "Bad request",
      });
    }
    const { error } = movieValidation(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const new_movie = new Movie({
      name: req.body.name,
      release_date: req.body.release_date,
      director: req.body.director,
      movie_type: req.body.movie_type,
      description: req.body.description,
      rate: req.body.rate,
      budget: req.body.budget,
      main_actors: req.body.main_actors,
      ticket_price: req.body.ticket_price,
      show_time: req.body.show_time,
      age_range: req.body.age_range,
    });

    try {
      await new_movie.save();
      res.status(201).json({
        confirmation: "success",
        movie_id: new_movie._id,
        body: `The movie: '${req.body.name}' is added to db`,
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: error.message,
      });
    }
  })
  .get("/all_movies", async (req, res) => {
    const movies = await Movie.find();

    try {
      res.status(200).json({
        confirmation: "success",
        number_of_movies: movies.length,
        body: movies,
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: error.message,
      });
    }
  })
  .get("/find_movie", async (req, res) => {
    try {
      const movie = await Movie.find({ _id: req.query.id });
      res.status(200).json({
        confirmation: "success",
        body: movie,
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: error.message,
      });
    }
  });

module.exports = router;
