const express = require("express");
const router = express.Router();

const User = require("../model/User");
const Ticket = require("../model/Ticket");
const Movie = require("../model/Movie");

const { verifyIsUser } = require("../middleware/user");

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

      for (let i = 0; i < req.body.number_of_seats; i++) {
        await new Ticket({
          customer_id: req.body.customer_id,
          movie_id: req.body.movie_id,
        }).save();
      }

      customer.number_of_tickets = customer.number_of_tickets +=
        req.body.number_of_seats;
      movieExist.number_of_seats = movieExist.number_of_seats -=
        req.body.number_of_seats;

      await customer.save();
      await movieExist.save();
      customer;
      res.json({
        confirmation: "success",
        body: "New ticket is added to db",
      });
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .get("/user_tickets", verifyIsUser, async (req, res) => {
    const tickets = await Ticket.find({ customer_id: req.query.customer_id });

    const body = await Promise.all(
      tickets.map(async (item) => {
        let movie = await Movie.findOne({ _id: item.movie_id });

        if (!movie) return;

        return {
          ticket_id: item._id,
          movie_id: movie._id,
          name: movie.name,
          type: movie.type,
          price: movie.ticket_price,
          screening: movie.show_time,
          url: movie.image_url,
        };
      })
    );

    if (!body.length) {
      return res.status(400).json({
        confirmation: "success",
        body: `The user has no tickets in db`,
      });
    }
    try {
      res.status(200).json({ confirmation: "success", body });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        error: "Error occured while requesting",
      });
    }
  })
  .delete("/delete_ticket", verifyIsUser, async (req, res) => {
    try {
      const ticket = await Ticket.find({ movie_id: req.body.movie_id });
      const movie = await Movie.findOne({ _id: req.body.movie_id });
      const user = await User.findOne({ _id: ticket[0].customer_id });

      if (!(ticket && movie && user)) {
        return res.status(400).json({
          error: "Fail to Find ids",
        });
      }

      movie.number_of_seats = movie.number_of_seats += ticket.length;
      user.number_of_tickets = user.number_of_tickets -= ticket.length;

      ticket.forEach((t) => {
        t.delete();
      });

      await movie.save();
      await user.save();

      res.status(201).json({
        confirmation: "success",
        body: ticket,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        confirmation: "fail",
        body: "Error occue while deleting",
      });
    }
  });

module.exports = router;
