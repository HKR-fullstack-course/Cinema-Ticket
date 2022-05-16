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

  // .get("/get_tickets", async (req, res) => {
  //   const user_tickets = await Ticket.find({
  //     customer_id: req.body.customer_id,
  //   });

  //   if (!user_tickets) {
  //     return res.status(400).json({
  //       confirmation: "success",
  //       body: `The user has no tickets in db`,
  //     });
  //   }

  //   res.status(200).json({
  //     confirmation: "seccuss",
  //     user_booking: user_tickets.length,
  //   });
  // })
  .get("/user_tickets", verifyIsUser, async (req, res) => {
    const tickets = await Ticket.find({ customer_id: req.query.customer_id });

    const body = await Promise.all(
      tickets.map(async (item) => {
        const movie = await Movie.find({ _id: item.movie_id });

        return {
          ticket_id: item._id,
          movie_id: movie[0]._id,
          name: movie[0].name,
          type: movie[0].type,
          price: movie[0].ticket_price,
          screening: movie[0].show_time,
          url: movie[0].image_url,
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
  .get("/tickets", async (req, res) => {
    const tickets = await Ticket.find({ customer_id: req.query.customer_id });

    const body = await Promise.all(
      tickets.map(async (item) => {
        const movie = await Movie.find({ _id: item.movie_id });

        return {
          ticket_id: item._id,
          movie_id: movie[0]._id,
          name: movie[0].name,
          type: movie[0].type,
          price: movie[0].ticket_price,
          screening: movie[0].show_time,
          url: movie[0].image_url,
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
      const ticket = await Ticket.findOne({ _id: req.body.ticket_id });
      const movie = await Movie.findOne({ _id: req.body.movie_id });
      const user = await User.findOne({ _id: req.body.customer_id });

      if (!(ticket && movie && user)) {
        return res.status(400).json({
          error: "Fail to Find ids",
        });
      }

      movie.number_of_seats = movie.number_of_seats += 1;
      user.number_of_tickets = user.number_of_tickets -= 1;
      await ticket.deleteOne();
      await movie.save();
      await user.save();

      res.status(201).json({
        confirmation: "success",
        body: "Ticket is deleted",
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
