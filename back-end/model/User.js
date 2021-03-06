require("dotenv/config");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  phonenumber: {
    type: String,
    required: true,
    length: 10,
    min: 10,
  },
  number_of_tickets: {
    type: Number,
    default: 0,
  },
  birthdate: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    default: `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1652046733/image/avatar/default.jpg`,
  },
  role: {
    type: String,
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
