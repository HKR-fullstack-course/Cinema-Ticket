const express = require("express");
const router = express.Router();

const User = require("../model/User");
const Ticket = require("../model/Ticket");
const Movie = require("../model/Movie");

router
  .post("/add_ticket", async (req, res) => {
    const userExist = await User.findOne({ _id: req.body.customer_id });
    const movieExist = await Movie.findOne({ _id: req.body.movie_id });

    if (!userExist && !movieExist) {
      return res.status(400).json({
        error: "Check customer and movie id",
      });
    }

    const new_ticket = Ticket({
      customer_id: req.body.customer_id,
      movie_id: req.body.movie_id,
    });

    try {
      await new_ticket.save();
      res.json({
        confirmation: "seccuss",
        body: "New ticket is added to db",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  })
  // to return all tickets that belong to user
  .get("/get_tickets", async (req, res) => {
    const user_tickets = await Ticket.find({
      customer_id: req.query.customer_id,
    });

    if (user_tickets == null) {
      res.status(400).json({
        confirmation: "success",
        body: `The user has no tickets in db`,
      });
      return;
    }
    res.json({ user_tickets });
  });

module.exports = router;
