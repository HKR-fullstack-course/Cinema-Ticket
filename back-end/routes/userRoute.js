const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const Admin = require("../model/Admin");
const Img = require("../model/Image");
const { userRegisterValidation } = require("../validation/user");

const router = express.Router();

router.post("/create_user", async (req, res) => {
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

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    phonenumber: req.body.phonenumber,
  });

  try {
    await user.save();
    res.json({
      confirmation: "seccuss",
      user_id: user._id,
      body: user.name + " created",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
