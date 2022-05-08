const express = require("express");
const router = express.Router();
var moment = require("moment");

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
      show_date: req.body.show_date,
      age_range: req.body.age_range,
    });

    try {
      await new_movie.save();
      res.status(201).json({
        confirmation: "success",
        movie_id: new_movie._id,
        body: `The movie: '${req.body.name}' is added to db`,
      });
    } catch (err) {
      res.status(404).json({
        confirmation: "fail",
        body: err.message,
      });
    }
  })
  .get("/all_movies", async (req, res) => {
    const moviesSet = await Movie.find().then((movies) => {
      movies.forEach((movie) => {
        movie.show_time = formatTime(movie.show_time, true);
        movie.release_date = formatTime(movie.release_date, false);
      });
      return movies;
    });

    try {
      res.status(200).json({
        confirmation: "success",
        number_of_movies: moviesSet.length,
        body: moviesSet,
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: error.message,
      });
    }
  })
  .get("/movies", async (req, res) => {
    try {
      const movies = await Movie.find();
      const uniqueSet = [
        ...new Map(movies.map((item) => [item.name.trim(), item])).values(),
      ];

      const body = uniqueSet.map((movie) => {
        return {
          name: movie.name,
          movie_type: movie.movie_type,
          description: movie.description,
          rate: movie.rate,
        };
      });
      res.status(200).json({
        confirmation: "success",
        body,
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: error.message,
      });
    }
  })
  // .get("/movie", async (req, res) => {
  //   const movies = await Movie.find();
  //   const movie = {};
  //   const data = movies.filter((item) => item.name == req.query.movie_name);

  //   for (let obj of movies) {
  //     if (obj.name.trim() == req.query.movie_name) {
  //       movie[obj._id] = formatTime(obj.show_time, true);
  //     }
  //   }

  //   res.json({ confirmation: "seccuss", body: movie });
  // })
  .get("/movie/:_id", async (req, res) => {
    const allMovies = await Movie.find();
    const movieName = await Movie.findOne({ _id: req.params._id });
    const data = allMovies.filter((item) => item.name >= movieName.name);

    let returnedValue = [];

    for (let k of data) {
      let time = k.show_time;
      let price = k.ticket_price;
      returnedValue.push({  _id: k._id , ticket_price: price, show_time: time});
    }

    res.json({
      confirmation: "success",
      body: {
        name: movieName.name,
        movie_type: movieName.movie_type,
        release_date: movieName.release_date,
        director: movieName.director,
        description: movieName.description,
        rate: movieName.rate,
        budget: movieName.budget,
        main_actors: movieName.main_actors,
        time: returnedValue,
      },
    });
  })
  .get("/all_movies/:movie_type", async (req, res) => {
    try {
      const all_movies = await Movie.find({
        movie_type: new RegExp("^" + req.params.movie_type + "$", "i"),
      });

      const uniqueSet = [
        ...new Map(all_movies.map((item) => [item.name.trim(), item])).values(),
      ];

      res.status(200).json({
        confirmation: "success",
        body: uniqueSet,
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: error.message,
      });
    }
  });

const formatTime = (time, timeRequired) => {
  const date = timeRequired ? "dddd, Do MMMM YYYY; h:mm a" : "Do MMMM YYYY";
  return moment(new Date(time)).format(date);
};

module.exports = router;
