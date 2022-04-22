require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const signale = require("signale");

const app = express();
app.use(express.json());

const fakser_api = require("./routes/faker");

app.use("/fake", fakser_api);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => signale.start("Start listening on port => " + PORT))
  )
  .catch((err) => signale.error(err.message));

// app.listen(PORT, () => signale.start("Start listening on port => " + PORT));
