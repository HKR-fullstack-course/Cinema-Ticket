import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar";
const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Nav>
        <NavLink to="/">
          <img
            src={require("../../images/logo.png")}
            alt="logo"
            width="350px" height="70px"
          />
        </NavLink>
        <Bars onClick={toggle}>
          <FaBars />
        </Bars>
        <NavMenu>
          <NavLink to="/movie_list">Movies</NavLink>
          <NavLink to="/about">About</NavLink>
          {/* <NavLink to="/services">Services</NavLink> */}
        </NavMenu>
        <NavBtn onSubmit={props.onSubmit}>
          <NavBtnLink to="/signin" onSubmit={props.onSubmit}>
            Sign In
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
