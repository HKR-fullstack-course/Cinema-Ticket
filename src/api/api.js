import axios from "axios";

export default axios.create({
  baseURL: "https://api-cinema-ticket.herokuapp.com/api",
});
