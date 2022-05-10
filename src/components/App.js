import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarParent from "./Navbar/NavbarParent";
import Parent_slide from "./Parent_Slide";

import Home from "../pages";
import About from "../pages/about";
import Movies from "../pages/movies";
import Signin from "../pages/signin";
import Register from "../pages/register";
import ErrorPage from "../pages/ErrorPage";
import Services from "../pages/services";
import Users from "../pages/users";
import AllMovies from "../pages/allMovies(Admin)";
import AddMovie from "../pages/addMovie";
import MoviePage from "./MoviePage";

import Sidebar from "./Sidebar";

export const AuthContext = React.createContext();

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <NavbarParent toggle={toggle} />

      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/all_movies" element={<AllMovies />} />
        <Route path="/movie/:name" element={<Parent_slide />} />

        {/* //Movie slider  */}
        <Route exact path="/add_movie" element={<AddMovie />} />
        <Route exact path="/movie/:_id" element={<MoviePage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
