const express = require("express");
const router = express.Router();


const Movie = require("../model/Movie");

router.post("/add_movie", async (req, res) => {
  if (req.body == null) {
    return res.status(400).json({
      error: "Bad request",
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
});

module.exports = router;
