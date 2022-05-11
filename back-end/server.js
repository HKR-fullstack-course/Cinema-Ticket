require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signale = require("signale");

const PORT = process.env.PORT || 5000;
const img = require("./routes/imgRoute");
const user = require("./routes/userRoute");
const movie = require("./routes/movieRoute");
const login = require("./routes/loginRoute");
const admin = require("./routes/adminRoute");
const ticket = require("./routes/ticketRoute");
const home = require("./routes/api_doc/homeRoute");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(cors());
app.use("/api", img);
app.use("/api", user);
app.use("/api", movie);
app.use("/api", login);
app.use("/api", admin);
app.use("/api/ticket", ticket);
app.use("/", home);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => signale.start("Start listening on port => " + PORT))
  )
  .catch((err) => signale.error(err.message));
