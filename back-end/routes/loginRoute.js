const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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
  if (user) {
    validPassword = await bcrypt.compare(req.body.password, user.password);
    role = user;
  }
  if (admin) {
    validPassword = await bcrypt.compare(req.body.password, admin.password);
    role = admin;
    role["admin"] = true;
  }

  if (!validPassword) {
    return res.status(400).json({
      error: "Invalid Password",
      // error: "Check your email and password", // use this line as err-msg later
    });
  }

  res.json({
    confirmation: "success",
    role: admin ? true : false,
    body: {
      _id: role._id,
      name: role.name,
      email: role.email,
      phonenumber: role.phonenumber,
    },
  });
});

module.exports = router;
