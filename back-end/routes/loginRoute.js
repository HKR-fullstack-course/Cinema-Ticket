const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const User = require("../model/User");
const Admin = require("../model/Admin");

const { loginValidation } = require("../validation/login");

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const user = await User.findOne({ email: req.body.email });
  const admin = await Admin.findOne({ email: req.body.email });

  if (!user && !admin) {
    return res.status(400).json({
      error: "Check your email and password",
    });
  }

  let validPassword;
  let role;
  let age;
  if (user) {
    validPassword = await bcrypt.compare(req.body.password, user.password);
    role = user;
    age = getAge(role.birthdate);
  }
  if (admin) {
    validPassword = await bcrypt.compare(req.body.password, admin.password);
    role = admin;
    role["admin"] = true;
  }
  if (!validPassword) {
    return res.status(400).json({
      error: "Check your email and password",
    });
  }

  res.json({
    confirmation: "success",
    token: jwt.sign({ role }, process.env.CLIENT_TOKEN),
    body: {
      _id: role._id,
      name: role.name,
      email: role.email,
      phonenumber: role.phonenumber,
      age,
    },
  });
});

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

module.exports = router;
