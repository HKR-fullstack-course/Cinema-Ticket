const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const Admin = require("../model/Admin");
const Movies = require("../model/Movie");

const { userRegisterValidation } = require("../validation/user");
const { verifyOwner } = require("../middleware/owner");
const { verifyIsAdmin } = require("../middleware/admin");

const router = express.Router();

router
  .post("/create_admin", verifyOwner, async (req, res) => {
    const { regError } = userRegisterValidation(req.body);

    if (regError) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const userExist = await User.findOne({ email: req.body.email });
    const adminExist = await Admin.findOne({ email: req.body.email });

    if (userExist || adminExist) {
      return res.status(400).json({
        error: "Email exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phonenumber: req.body.phonenumber,
      image_url: req.body.image_url,
    });

    try {
      await admin.save();
      res.json({
        confirmation: "seccuss",
        user_id: admin._id,
        body: admin.name + " created",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get("/all_users", verifyIsAdmin, async (req, res) => {
    const users = await User.find({});

    if (!users) {
      return res.status(204).json({
        confirmation: "seccuss",
        body: "There is not users to show",
      });
    }

    const body = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
        url: user.image_url,
        n_tickets: user.number_of_tickets,
      };
    });

    try {
      res.json({
        confirmation: "seccuss",
        body,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get("/all_movies_table", verifyIsAdmin, async (req, res) => {
    const movies = await Movies.find({});

    if (!movies) {
      return res.status(204).json({
        confirmation: "seccuss",
        body: "There is not movies to show",
      });
    }

    const body = movies.map((movie) => {
      return {
        _id: movie._id,
        name: movie.name,
        ticket_price: movie.ticket_price,
        age_range: movie.age_range,
        show_time: movie.show_time,
        url: movie.image_url,
        number_of_seats: movie.number_of_seats,
      };
    });

    try {
      res.json({
        confirmation: "seccuss",
        body,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete("/delete_user_account", verifyIsAdmin, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.body._id });

      if (!user) {
        return res.status(400).json({
          error: "Fail to Find the User",
        });
      }

      res.status(201).json({
        confirmation: "success",
        body: "User account is deleted",
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: "Error occue while deleting",
      });
    }
  });

module.exports = router;
