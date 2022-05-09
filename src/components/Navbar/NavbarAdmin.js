import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";

const NavbarAdmin = (props, { toggle }) => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src={require("../../images/logo.png")}
            alt="logo"
            width="110px"
            height="80px"
          />
        </NavLink>
        <Bars onClick={toggle}>
          <FaBars />
        </Bars>
        <NavMenu>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/add_movie">Add Movie</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Users</NavLink>
          <NavLink to="/create_admin">Create Admin Account</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink replace to="/" onClick={props.logout}>
            {props.layout}
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavbarAdmin;