const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    require: true,
  },
  movie_id: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
