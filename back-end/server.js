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
const APIadmin = require("./routes/secure/apiRoute");
const apiHomeSecure = require("./routes/secure/apiRoute");
const secure = require("./routes/secure/secure");
const page = require('./routes/secure/homeRoute')

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.use(cors());
app.use("/api", img);
app.use("/api", user);
app.use("/api", movie);
app.use("/api", login);
app.use("/api", APIadmin);
app.use("/doc", apiHomeSecure);
app.use("/doc/varify", secure);
app.use("/", page);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => signale.start("Start listening on port => " + PORT))
  )
  .catch((err) => signale.error(err.message));
