const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    img: { 
        data: Buffer, 
        contentType: String, 
 },
    owner_id: {
      // to save img-owner id e.g. movie or user
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Image", imageSchema);
