const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "admin",
  },
  image_url: {
    type: String,
    default: `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1652046733/image/avatar/default.jpg`,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
