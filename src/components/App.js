import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavbarParent from "./Navbar/NavbarParent";
import Sidebar from "./Sidebar";
import Parent_slide from "./Parent_Slide";

import Home from "../pages";
import About from "../pages/about";
import Movies from "../pages/movies";
import Signin from "../pages/signin";
import ErrorPage from '../pages/ErrorPage'
import Services from "../pages/services";

export const AuthContext = React.createContext();


const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      
      <NavbarParent  toggle={toggle} />

      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/signin" element={<Signin />} />
        {/* //Movie slider  */}
        <Route exact path="/movie/:name" element={<Parent_slide />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
