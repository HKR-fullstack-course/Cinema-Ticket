const express = require("express");
const router = express.Router();

const User = require("../model/User");
const Ticket = require("../model/Ticket");
const Movie = require("../model/Movie");

router
  .post("/add_ticket", async (req, res) => {
    try {
      const customer = await User.findById(req.body.customer_id);
      const movieExist = await Movie.findById(req.body.movie_id);

      if (!(customer && movieExist)) {
        return res.status(400).json({
          error: "Check customer and movie id",
        });
      }

      const new_ticket = Ticket({
        customer_id: req.body.customer_id,
        movie_id: req.body.movie_id,
      });

      customer.number_of_tickets = customer.number_of_tickets +=
        req.body.number_of_seats;
      movieExist.number_of_seats = movieExist.number_of_seats -=
        req.body.number_of_seats;

      await new_ticket.save();
      await customer.save();
      await movieExist.save();
      customer;
      res.json({
        confirmation: "seccuss",
        body: "New ticket is added to db",
      });
    } catch (error) {
      res.status(404).json(error);
    }
  })
  // to return all tickets that belong to user
  .get("/get_tickets", async (req, res) => {
    const user_tickets = await Ticket.find({
      customer_id: req.body.customer_id,
    });

    if (!user_tickets) {
      res.status(400).json({
        confirmation: "success",
        body: `The user has no tickets in db`,
      });
      return;
    }
    res.status(200).json({
      confirmation: "seccuss",
      user_booking: user_tickets.length,
    });
  });

module.exports = router;
