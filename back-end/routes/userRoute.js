const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const Avatar = require("avatar-builder");
const { generateFromString } = require("generate-avatar");
const faker = require("@faker-js/faker").default;

const User = require("../model/User");
const Admin = require("../model/Admin");
const Img = require("../model/Image");

const router = express.Router();

router.post("/create_user", async (req, res) => {
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

  //   const avatar = Avatar.builder(
  //     Avatar.Image.margin(Avatar.Image.circleMask(Avatar.Image.identicon())),
  //     128,
  //     128,
  //     { cache: Avatar.Cache.lru() }
  //   );

//   const image = generateFromString(req.body.name);

  //   const image = avatar.create(req.body.name);

  const user_img = new Img();
  user_img.img.data = Buffer.from(generateFromString(req.body.name)).toString('base64');
  user_img.img.contentType = "image/jpeg"; // or 'image/png'
  user_img.owner_id = user._id;

  try {
    await user.save();
    await user_img.save();
    res.json({
      confirmation: "seccuss",
      body: user.name + " created",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = router;
