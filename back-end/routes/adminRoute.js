const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const Admin = require("../model/Admin");

const { userRegisterValidation } = require("../validation/user");

const router = express.Router();

router.post("/create_admin", async (req, res) => {
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
  });

  try {
    await admin.Admin();
    res.json({
      confirmation: "seccuss",
      user_id: admin._id,
      body: admin.name + " created",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
