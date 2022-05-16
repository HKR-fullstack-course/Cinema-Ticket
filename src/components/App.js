import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarParent from "./Navbar/NavbarParent";

import Home from "../pages";
import About from "../pages/about";
import Movies from "../pages/movies";
import GuestMovie from "../pages/guess_movie"
import Signin from "../pages/signin";
import Register from "../pages/register";
import ErrorPage from "../pages/ErrorPage";
import Services from "../pages/services";
import Users from "../pages/users";
import AllMovies from "../pages/allMovies(Admin)";
import AddMovie from "../pages/addMovie";
import MoviePage from "./MoviePage";
import Auth from "../_helper/Auth";
import Navbar from "./Navbar/NavbarGuest";
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import TicketTable from "../pages/ticketTable(User)";
export const AuthContext = React.createContext();

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {/* <NavbarParent toggle={toggle} /> */}
      {/* this is another way to get ride of Navbar-Parent, Toggling and fixing drop list issue may be easier ? */}
      {(Auth.isAuthenticated ? (Auth.isAdmin ? <NavbarAdmin toggle={toggle} /> : <NavbarUser layout={"Log Out"} toggle={toggle} />) : <Navbar layout="Sing In" toggle={toggle} />)}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        {/* <Route exact path="/services" element={<Services />} /> */}
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/movie_list" element={<GuestMovie />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/addMovie" element={<AddMovie />} />
        <Route exact path="/all_movies" element={<AllMovies />} />
        <Route exact path="/tickets" element={<TicketTable />} />

        {/* //Movie slider  */}
        <Route exact path="/add_movie" element={<AddMovie />} />
        <Route exact path="/movie/:_id" element={<MoviePage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
