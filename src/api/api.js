import axios from "axios";

export default axios.create({
  //   baseURL: "https://api-cinema-ticket.herokuapp.com/api",
  baseURL: "http://localhost:5000/api",
});
