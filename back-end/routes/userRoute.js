const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const Admin = require("../model/Admin");
const Img = require("../model/Image");
const { userRegisterValidation } = require("../validation/user");

const router = express.Router();

router
  .post("/create_user", async (req, res) => {
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
      birthdate: req.body.birthdate,
      image_url: req.body.image_url,
    });

    try {
      await user.save();
      res.json({
        confirmation: "seccuss",
        user_id: user._id,
        body: user.name + " created",
      });
    } catch (error) {
      res.status(400).json({ confirmation: "fail", error: error.message });
    }
  })
  .put("/update_user", async (req, res) => {
    const user = await User.findOne({ _id: req.body.user_id });

    if (!user) {
      return res.status(400).json({
        error: "Fail to Find the User",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      user.name = req.body.name || user.name;
      user.image_url = req.body.url || user.image_url;
      user.password = hashPassword;
      user.email = req.body.email || user.email;
      user.phonenumber = req.body.phonenumber || user.phonenumber;
      user.image_url = req.body.image_url || user.image_url;

      await user.save();
      res.status(201).json({
        confirmation: "success",
        body: "User is updated",
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "fail",
        body: "Error occue while updating",
      });
    }
  });

module.exports = router;
