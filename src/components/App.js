import React, { useState } from "react";
 import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages";
import About from "../pages/about";
import Movies from "../pages/movies";
import Signin from "../pages/signin";
import Services from "../pages/services";
import Sidebar from "./Sidebar";
import Parent_slide from "./Parent_Slide";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      this one
      {/* //NavBar   */}
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/signin" element={<Signin />} />
        {/* //Movie slider  */}
        <Route path="/movie/:name" element={<Parent_slide />} />
      </Routes>
    </Router>
  );
}

export default App;
