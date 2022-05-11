import { React, useState, useEffect } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";

import Auth from "../../_helper/Auth";

const NavbarUser = ({ toggle }) => {
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
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Buy Ticket</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink
            to="/signin"
            replace
            to="/"
            onClick={() => {
              Auth.logout();
              window.localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Log Out
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavbarUser;
