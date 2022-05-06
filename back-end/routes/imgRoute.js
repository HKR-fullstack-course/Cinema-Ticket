const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Img = require("../model/Image");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
});

const upload = multer({ storage: storage });

router
  .post("/image", upload.single("file"), async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        confirmation: "Fail",
        body: "Invalid request",
      });
      return;
    }

    try {
      const new_img = new Img();
      new_img.img.data = fs.readFileSync(path.resolve(req.file.path));
      new_img.img.contentType = "image/jpeg"; // or 'image/png'
      new_img.owner_id = req.body.owner_id;
      await new_img.save();

      res.
      status(200)
      .header("Access-Control-Allow-Origin", "*")    // test solve CORS-origin from server side
      .json({
        confirmation: "success",
        body: "Image is added to db",
      });
    } catch (error) {
      res.status(404).json({
        confirmation: "Fail",
        body: error.message,
      });
    }
  })
  .get("/image", async (req, res) => {
    const img = await Img.findOne({
      owner_id: req.query.owner_id,
    });

    if (img == null) {
      res.status(400).json({
        confirmation: "Fail",
        body: `Could not find image with id: ${req.query}`,
      });
      return;
    }

    res.json({
      img,
    });
  });

module.exports = router;
